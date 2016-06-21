import { v4 } from 'node-uuid'

const {
  MESSAGE
} = require('../../common/constants');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };
const state = () => socketApp.getState();

const message = (connection, text) => ({
  id: v4(),
  name: connection.getUsername(),
  text
});

const sendMessage = (connection, text) => {
  socketApp.dispatch({
    type: MESSAGE,
    payload: message(connection, text)
  });
};

module.exports = {
  setSocketApp,
  sendMessage
};