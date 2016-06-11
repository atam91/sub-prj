const { date } = require('../../common/lib/utils');

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS
} = require('../../common/constants/SocketEvents');

module.exports = function(socketApp) {
  const service = {};
  const users = {};

  service.participants = () => {
    console.log(date(), 'PARTICIPANTS', Object.keys(users));
    socketApp.dispatch(PARTICIPANTS, Object.keys(users));
  };

  service.disconnect = (connection) => {
    delete users[connection.getUsername()];
    service.participants();
  };

  service.handlers = {
    LOGIN_REQUEST:
      (connection) => (name) => {
        if (!name.trim()) {
          connection.dispatch(LOGIN_FAILURE, 'Empty name');
        } else if (name in users) {
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