const { forEachKey, date } = require('./utils');

const STATE = 'STATE';
const DISCONNECT = 'DISCONNECT';

const StatefulSocketConnection = function(socket, reducer) {
  const connection = {};

  var state = reducer(undefined, {});

  connection.dispatch = (type, payload) => {
    socket.emit(type, payload);
    state = reducer(state, { type, payload });
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
    forEachKey(services, (name, service) => { 
      service.setSocketApp && service.setSocketApp(this);
    });

    this.init(Connection);
  }

  emitState(connection) {
    const connectionSocket = connection && connection.getSocket();
    (connectionSocket || this.io).emit(STATE, this.state);
  }

  dispatch(type, payload) {
    this.io.emit(type, payload);
    this.state = this.stateReducer(this.state, { type, payload });
  }

  init(Connection) {
    console.log(date(), 'INIT MAIN STATE');
    this.state = this.stateReducer(undefined, {});

    var i = 0;
    this.io.on('connection', (socket) => {
      let j = i++;
      console.log(date(), 'connect #', j);
      const connection = Connection(socket);

      this.emitState(connection);

      forEachKey(this.services, (name, service) => {
        service.connect && service.connect(connection);
      });

      socket.on('disconnect', () => {
        console.log(date(), 'disconnecting #', j);
        forEachKey(this.services, (name, service) => {
          service.disconnect && service.disconnect(connection);
        });
        socket.emit(DISCONNECT);
      });
    });
  }
}

const client = function(clientDescription) {
  var requestActions = {};
  forEachKey(clientDescription.requests, (name, action) => {
    requestActions[action().type] = true;
  });

  const socketService = (socket, dispatch) => {
    clientDescription.listens.forEach((type) => {
      socket.on(type, (payload) => {
        dispatch({ type, payload });
      });
    });

    if (clientDescription.disconnectAction) {
      socket.on('disconnect', () => {
        dispatch({
          type: clientDescription.disconnectAction,
          payload: {}
        });
      });
    }
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
  DISCONNECT,
  SocketApp,
  StatefulSocketConnection,
  client
};