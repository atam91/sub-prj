const { date, forEachKey } = require('../../common/lib/utils');

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS
} = require('../../common/constants/SocketEvents');

var socketApp;
const setSocketApp = (app) => { socketApp = app; };

const users = {};

const participants = () => {
  console.log(date(), 'PARTICIPANTS', Object.keys(users));
  socketApp.dispatch(PARTICIPANTS, Object.keys(users));
};

const handlers = {
  LOGIN_REQUEST:
    (connection) => (payload) => {
      const name = payload.trim();
      if (!name) {
        connection.dispatch(LOGIN_FAILURE, 'Empty name');
      } else if (name in users) {
        connection.dispatch(LOGIN_FAILURE, 'Name alredy in use');
      } else {
        users[name] = connection.getSocket().id;
        connection.dispatch(
          LOGIN_SUCCESS,
          { auth: true, name: name }
        );
        participants();
      }
    },

  LOGOUT_SEND:
    (connection) => () => {
      disconnect(connection);
      connection.dispatch(LOGOUT_EVENT);
    }
};

const connect = (connection) => {
  forEachKey(handlers, connection.handleRequest);
};

const disconnect = (connection) => {
  delete users[connection.getUsername()];
  participants();
};

module.exports = {
  setSocketApp,
  connect,
  disconnect,
  participants
};