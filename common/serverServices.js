const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS,
  MESSAGE_SEND,
  MESSAGE_EVENT
} = require('./constants/SocketEvents');

const loginService = function(socketApp) {
  const service = {};
  const users = {};

  service.participants = () => {
    console.log('PARTICIPANTS', Object.keys(users));
    socketApp.dispatch(PARTICIPANTS, Object.keys(users));
  };

  service.disconnect = (connection) => {
    delete users[connection.getUsername()];
    service.participants();
  };

  service.handlers = {
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

  return service;
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

module.exports = {
  login: loginService,
  chat: chatService
};