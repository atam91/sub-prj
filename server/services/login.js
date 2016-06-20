const { date, forEachKey } = require('../../common/lib/utils');

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

const participants = () => {
  console.log(date(), 'PARTICIPANTS', Object.keys(users));
  socketApp.dispatch({
    type: PARTICIPANTS, 
    payload: Object.keys(users)
  });
};

const getName = (action) => action.payload.trim().replace(/\s+/g, ' ');

const handler = (connection, action) => {
  const loginFailure = (error) => connection.dispatch({
    type: LOGIN_FAILURE,
    error
  });

  const loginSuccess = (name) => connection.dispatch({
    type: LOGIN_SUCCESS,
    name
  });

  switch (action.type) {
    case LOGIN_REQUEST:
      if (connection.isAuth()) return;

      const name = getName(action);
      if (!name) {
        loginFailure('Empty name');
      } else if (name in users) {
        loginFailure('Name alredy in use');
      } else {
        users[name] = connection.getSocket().id;
        loginSuccess(name);
        participants();
      }
      break;

    case LOGOUT_SEND:
      disconnect(connection);
      break;
  }
};

const disconnect = (connection) => {
  delete users[connection.getUsername()];
  participants();
  connection.dispatch({ type: LOGOUT_EVENT });
};

module.exports = {
  setSocketApp,
  handler,
  disconnect
};