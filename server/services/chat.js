import { v4 } from 'node-uuid'

const {
  MESSAGE,
  GAME
} = require('../../common/constants');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };
const state = () => socketApp.getState();

const createMessage = (connection, text) => ({
  from: connection.getUsername(),
  id: v4(),
  text
});

const sendMessage = (connection, text) => {
  const message = createMessage(connection, text);

  socketApp.dispatch({
    type: MESSAGE,
    id: message.id,
    payload: message
  });
};

const sendGame = (game) => {
  socketApp.dispatch({
    type: GAME,
    id: game.id,
    payload: game
  });
};

module.exports = {
  setSocketApp,
  sendMessage,
  sendGame
};