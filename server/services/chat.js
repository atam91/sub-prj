import { v4 } from 'node-uuid'

const {
  MESSAGE,
  GAME
} = require('../../common/constants');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };
const state = () => socketApp.getState();

const message = (connection, text) => ({
  id: v4(),
  type: 'text',
  name: connection.getUsername(),
  text
});

const sendMessage = (connection, text) => {
  socketApp.dispatch({
    type: MESSAGE,
    payload: message(connection, text)
  });
};

const sendGame = (connection, game) => {
  socketApp.dispatch({
    type: GAME,
    payload: {
      ...game,
      type: 'game',
      name: connection.getUsername()
    }
  });
};

module.exports = {
  setSocketApp,
  sendMessage,
  sendGame
};