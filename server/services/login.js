const { ACTION } = require('../../common/lib/SocketApp');
const console = require('../../common/lib/console')('login', 'green');
const bold = console.bold;

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS
} = require('../../common/constants/SocketEvents');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

const users = {};

const participants = (payload = getParticipants()) => ({ type: PARTICIPANTS, payload });

const getParticipants = () => Object.keys(users);

const sendParticipants = () => {
  console.log('PARTICIPANTS:', bold(getParticipants()));
  socketApp.dispatch(participants());
};

const normalizeName = ({ name }) => name.trim().replace(/\s+/g, ' ');

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
});

const loginSuccess = (name) => ({
  type: LOGIN_SUCCESS,
  name
});

const handler = (connection, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      if (connection.isAuth()) return;

      const name = normalizeName(action);
      if (!name) {
        connection.dispatch(
          loginFailure('Empty name')
        );
      } else if (name in users) {
        connection.dispatch(
          loginFailure('Name alredy in use')
        );
      } else {
        users[name] = connection.getSocket().id;
        connection.dispatch(
          loginSuccess(name)
        );
        sendParticipants();
      }
      break;

    case LOGOUT_SEND:
      disconnect(connection);
      connection.dispatch({ type: LOGOUT_EVENT });
      break;
  }
};

const connect = (connection) => {
  connection.dispatch(participants());
};

const disconnect = (connection) => {
  if (connection.isAuth()) {
    delete users[connection.getUsername()];
    sendParticipants();
  }
};

module.exports = {
  setSocketApp,
  connect,
  handler,
  disconnect
};