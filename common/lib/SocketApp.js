const STATE = 'STATE';

const forEachKey = (obj, func) => {
  Object.keys(obj).forEach((key) => {
    func(key, obj[key])
  });
};

const SocketConnection = function(socket, reducer) {
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
  constructor(io, Connection, stateReducer, serverServices) {
    this.io = io;
    this.stateReducer = stateReducer;

    this.services = 
      Object.keys(serverServices)
        .reduce((prev, key) => {
          prev[key] = serverServices[key](this);
        });

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
    this.state = this.stateReducer();

    this.io.on('connection', (socket) => {
      var connection = Connection(socket);

      this.emitState(connection);
      this.connect(connection);

      socket.on('disconnect', () => {
        forEachKey(this.services, (name, service) => {
          service.disconnect && service.disconnect(connection);
        });

        delete connection;
      });
    });
  }

  connect(connection) {
    forEachKey(this.services, (name, service) => {
      forEachKey(service.handlers, connection.handleRequest);
    });
  }
}

const clientSocketService = function(socket, dispatch) {

};

const clientSocketMiddleware = function(socket, action) {

};

module.exports = { SocketApp, SocketConnection, STATE };