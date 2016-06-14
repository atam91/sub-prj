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

const prepareName = (payload) => payload.trim().replace(/\s+/g, ' ');

const handlers = {
  LOGIN_REQUEST:
    (connection) => (payload) => {
      if (connection.getAuth()) return;

      const name = prepareName(payload);
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
    }
};

const connect = (connection) => {
  forEachKey(handlers, connection.handleRequest);
};

const disconnect = (connection) => {
  delete users[connection.getUsername()];
  participants();
  connection.dispatch(LOGOUT_EVENT);
};

module.exports = {
  setSocketApp,
  connect,
  disconnect,
  participants
};