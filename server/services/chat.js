import { v4 } from 'node-uuid'
const login = require('./login');

const {
  GET,
  MAIN,
  GAME,
  ACTION,
  MESSAGE,
  GAME_DATA
} = require('../../common/constants');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };
const state = () => socketApp.getState();

const createMessage = (text) => ({
  text,
  id: v4(),
  type: MESSAGE
});

const createGame = (game) => ({
  game,
  data: {},
  id: v4(),
  type: GAME
});

const action = (payload, to) => ({
  to,
  payload,
  id: payload.id,
  type: GET
});

const send = (connection, object, to = MAIN) => {
  const username = connection.getUsername();
  
  if (to === MAIN) {
    object.from = username;
    socketApp.dispatch(action(object, to));
  } else {
    object.from = username + ' > ' + to;
    connection.dispatch(action(object, to));
    socketApp.io
      .to(login.getUserSocket(to))
      .emit(ACTION, action(object, username));
  }
};




/*

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

const sendGameData = (id, data) => {   ////////TODODOD!!!!
  socketApp.dispatch({
    type: GAME_DATA,
    id,
    data
  });
};*/

module.exports = {
  setSocketApp,
  createMessage,
  createGame,
  send/*
  sendMessage,
  sendGame,
  sendGameData*/
};




/*
const send = (action, to = '#main') => {
  if (to === '#main') {
    socketApp.dispatch(action);
  } else {
    socketApp.io.to(id).emit(ACTION, action);
  }
};*/