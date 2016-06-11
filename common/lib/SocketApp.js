const { forEachKey, date } = require('./utils');

const STATE = 'STATE';

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
  constructor(io, stateReducer, requestServices, services, Connection) {
    this.io = io;
    this.stateReducer = stateReducer;

    this.requestServices = {};
    forEachKey(requestServices, (key, value) => { this.requestServices[key] = value(this); });

    this.services = {};
    forEachKey(services, (key, value) => { this.services[key] = value(this); });

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
      this.connect(connection);

      socket.on('disconnect', () => {
        console.log(date(), 'disconnecting #', j);
        forEachKey(this.requestServices, (name, service) => {
          service.disconnect && service.disconnect(connection);
        });
      });
    });
  }

  connect(connection) {
    forEachKey(this.requestServices, (name, service) => {
      forEachKey(service.handlers, connection.handleRequest);
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
  SocketApp,
  StatefulSocketConnection,
  client
};