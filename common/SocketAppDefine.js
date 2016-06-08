const { SocketConnection } = require('./lib/SocketApp');
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS,
  MESSAGE_SEND,
  MESSAGE_EVENT,
  STATE
} = require('./constants/ApiEvents');
const stateReducer = require('./reducers/state');
const connectionReducer = require('./reducers/connection');

const action(type, payload = null) => {
  return { type, payload };
};

const clientDescription = function() {
  const requests = {
    loginRequest:
      (p) => action(LOGIN_REQUEST, p),

    logoutSend:
      () => action(LOGOUT_SEND),

    messsageSend:
      (p) => action(MESSAGE_SEND, p)
  };

  const listens = [
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_EVENT,
    PARTICIPANTS,
    MESSAGE_EVENT
    //STATE
  ];

  return { requests, listens };
}

const Connection = function(socket) {
  const connection = SocketConnection(socket, connectionReducer);

  connection.getAuth = () => connection.getState().user.auth;
  connection.getUsername = () => connection.getState().user.name;

  return connection;
};


const serverService = function(socketApp) {
  const service = {};
  const users = {};
  var messageId = 1;

  service.reducer = stateReducer;

  service.participants = () => {
    socketApp.dispatch(PARTICIPANTS, Object.keys(users));
  };

  service.disconnect = (connection) => {
    delete users[connection.getUsername()];
    service.participants();
  };

  const handlers = {
    LOGIN_REQUEST:
      (connection) => (name) => {
        if (name in users) {
          connection.dispatch(LOGIN_FAILURE, 'Имя уже используется');
        } else {
          users[name] = connection.socket.id;
          connection.dispatch(LOGIN_SUCCESS, name);
          service.participants();
        }
      },

    LOGOUT_SEND:
      (connection) => () => {
        service.disconnect(connection);
        connection.dispatch(LOGOUT_EVENT);
      },

    MESSAGE_SEND:
      (connection) => (text) => {
        socketApp.dispatch(MESSAGE_EVENT, {
          id: messageId++,
          name: connection.getUsername(),
          text
        });
      }
  };

  return { ...service, handlers };
};

module.exports = { 
  stateReducer,
  connectionReducer,
  clientDescription,
  Connection,
  loginService,
  chatService //TODOODODO
};









const loginService = function(socketApp) {
  const service = {};
  const users = {};

  service.participants = () => {
    socketApp.dispatch(PARTICIPANTS, Object.keys(users));
  };

  service.disconnect = (connection) => {
    delete users[connection.getUsername()];
    service.participants();
  };

  const handlers = {
    LOGIN_REQUEST:
      (connection) => (name) => {
        if (name in users) {
          connection.dispatch(LOGIN_FAILURE, 'Имя уже используется');
        } else {
          users[name] = connection.socket.id;
          connection.dispatch(LOGIN_SUCCESS, name);
          service.participants();
        }
      },

    LOGOUT_SEND:
      (connection) => () => {
        service.disconnect(connection);
        connection.dispatch(LOGOUT_EVENT);
      }
  };

  return { ...service, handlers };
};


const chatService = function(socketApp) {
  var index = 1;

  const handlers = {
    MESSAGE_SEND:
      (connection) => (text) => {
        socketApp.dispatch(MESSAGE_EVENT, {
          id: index++,
          name: connection.getUsername(),
          text
        });
      }
  };

  return { handlers };
}