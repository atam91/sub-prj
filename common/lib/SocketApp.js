const { forEachKey, date } = require('./utils');

const STATE = 'STATE';
const ACTION = 'ACTION';
const REQUEST = 'REQUEST';
const DISCONNECT = 'DISCONNECT';

const StatefulSocketConnection = function(socket, reducer) {
  const connection = {};
  
  let state = reducer(undefined, {});

  connection.dispatch = (action) => {
    socket.emit(ACTION, action);
    state = reducer(state, action);
  };

  connection.handleRequest = (type, handler) => {
    socket.on(type, handler(connection));
  };

  connection.getState = () => state;

  connection.getSocket = () => socket;

  return connection;
};

class SocketApp {
  constructor(io, stateReducer, services, Connection) {
    this.io = io;
    this.stateReducer = stateReducer;
    this.services = services;

    this.servicesCall('setSocketApp', this);
    this.init(Connection);
  }

  emitState(connection) {
    const connectionSocket = connection && connection.getSocket();
    (connectionSocket || this.io).emit(STATE, this.state);
  }

  dispatch(action) {
    this.io.emit(ACTION, action);
    this.state = this.stateReducer(this.state, action);
  }

  servicesCall(method, ...args ) {
    forEachKey(this.services, (key, service) => {
      service[method] && service[method]( ...args );
    });
  }

  init(Connection) {
    console.log(date(), 'INIT MAIN STATE');
    this.state = this.stateReducer(undefined, {});

    let i = 0;
    this.io.on('connection', (socket) => {
      const j = i++;
      console.log(date(), 'connect #', j);
      const connection = Connection(socket);

      this.emitState(connection);

      this.servicesCall('connect', connection);

      socket.on(REQUEST, (action) => {
        this.servicesCall('handler', connection, action);
      });

      socket.on('disconnect', () => {
        console.log(date(), 'disconnecting #', j);
        this.servicesCall('disconnect', connection);
        socket.emit(DISCONNECT);
      });

      socket.on('error', (e) => {
        console.log('SOCKET ERROR:', e);
      });
    });
  }
}

const client = function(clientDescription) {
  let requestActions = {};
  forEachKey(clientDescription.requests, (name, action) => {
    requestActions[action().type] = true;
  });

  const socketService = (socket, dispatch) => {
    socket.on(ACTION, (action) => dispatch(action));

    socket.on(STATE, (payload) => dispatch({ type: STATE, payload }));

    socket.on('disconnect', () => dispatch({ type: DISCONNECT }));

    socket.on(DISCONNECT, () => {
      //RECONNECT
    });
  };

  const socketRequestMiddleware = (socket, { type, payload }) => {
    if (type in requestActions) {
      socket.emit(type, payload);
    }
  };

  return { socketService, socketRequestMiddleware };
};

module.exports = {
  STATE,
  ACTION,
  REQUEST,
  DISCONNECT,
  SocketApp,
  StatefulSocketConnection,
  client
};