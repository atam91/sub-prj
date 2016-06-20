import * as fromState from '../../common/reducers/state';
const version = require('../../version');
const {
  MESSAGE,
  MESSAGES
} = require('../../common/constants/SocketEvents');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };
const state = () => socketApp.getState();

let index = 1;
const message = (name, text) => ({
  id: version + '_m_' + index++,
  name,
  text
});

const sendMessage = (connection, text) => {
  socketApp.dispatch({
    type: MESSAGE,
    payload: message(connection.getUsername(), text)
  });
};

const connect = (connection) => {
  const messages = fromState.getMessages(state());

  messages && connection.dispatch({
    type: MESSAGES,
    messages
  });
};

module.exports = {
  setSocketApp,
  connect,
  sendMessage
};