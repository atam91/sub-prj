const { forEachKey } = require('./utils');

const STATE = 'STATE';

const StatefulSocketConnection = function(socket, reducer) {
  const connection = {};

  var state = reducer();

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
  constructor(io, stateReducer, serverServices, Connection) {
    this.io = io;
    this.stateReducer = stateReducer;

    this.services = {};
    forEachKey(serverServices, (key, value) => { this.services[key] = value(this); });

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
    this.state = this.stateReducer(undefined, {});

    this.io.on('connection', (socket) => {
      const connection = Connection(socket);
      const clojure = { connection };

      this.emitState(clojure.connection);
      this.connect(clojure.connection);

      socket.on('disconnect', () => {
        forEachKey(this.services, (name, service) => {
          service.disconnect && service.disconnect(clojure.connection);
        });
        delete clojure.connection;
      });
    });
  }

  connect(connection) {
    forEachKey(this.services, (name, service) => {
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

    socket.on('disconnect', (payload) => {
      dispatch({
        type: clientDescription.disconnectAction,
        payload: {}
      });
    });
  };

  const socketRequestMiddleware = (socket, { type, payload }) => {
    console.log(type, requestActions, (type in requestActions));
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