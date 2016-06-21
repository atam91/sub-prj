const {
  ACTION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS
} = require('../../common/constants');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

const users = {};

const participants = () => ({ 
  type: PARTICIPANTS,
  participants: Object.keys(users)
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
});

const loginSuccess = (name) => ({
  type: LOGIN_SUCCESS,
  name
});

const normalizeName = ({ name }) => name.trim().replace(/\s+/g, ' ');

const handler = (connection, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      if (connection.isAuth()) return;

      const name = normalizeName(action);
      if (!name) {
        connection.dispatch(loginFailure('Empty name'));
      } else if (name in users) {
        connection.dispatch(loginFailure('Name alredy in use'));
      } else {
        users[name] = connection.getSocket().id;
        connection.dispatch(loginSuccess(name));
        socketApp.dispatch(participants());
      }
      break;

    case LOGOUT_SEND:
      disconnect(connection);
      connection.dispatch({ type: LOGOUT_EVENT });
      break;
  }
};

const disconnect = (connection) => {
  if (connection.isAuth()) {
    delete users[connection.getUsername()];
    socketApp.dispatch(participants());
  }
};

module.exports = {
  setSocketApp,
  handler,
  disconnect
};