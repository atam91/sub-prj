const {
  STATE,
  StatefulSocketConnection
} = require('./lib/SocketApp');
const { action } = require('./lib/utils');

const connectionReducer = require('./reducers/connection');
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS,
  MESSAGE_SEND,
  MESSAGE_EVENT
} = require('./constants/ApiEvents');


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
    MESSAGE_EVENT,
    STATE
  ];

  const disconnectAction = LOGOUT_EVENT;

  return { requests, listens, disconnectAction };
}


const ServerConnection = function(socket) {
  const connection = StatefulSocketConnection(socket, connectionReducer);

  connection.getAuth = () => connection.getState().user.auth;
  connection.getUsername = () => connection.getState().user.name;

  return connection;
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
          connection.dispatch(LOGIN_FAILURE, 'Name alredy in use');
        } else {
          users[name] = connection.getSocket().id;
          connection.dispatch(
            LOGIN_SUCCESS,
            { auth: true, name: name }
          );
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

const serverServices = {
  login: loginService,
  chat: chatService
};


module.exports = { 
  clientDescription,
  ServerConnection,
  serverServices
};