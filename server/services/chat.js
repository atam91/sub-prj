import { v4 } from 'node-uuid'
const login = require('./login');

const {
  GET,
  GET_DATA,
  MAIN,
  GAME,
  ACTION,
  MESSAGE
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

const getAction = (payload, to) => ({
  to,
  payload,
  id: payload.id,
  type: GET
});

const send = (connection, object, to = MAIN) => {
  const username = connection.getUsername();
  
  if (to === MAIN) {
    object.from = username;
    socketApp.dispatch(getAction(object, to));
  } else {
    object.from = username + ' > ' + to;
    connection.dispatch(getAction(object, to));
    if (to !== username) {
      socketApp.io
      .to(login.getUserSocket(to))
      .emit(ACTION, getAction(object, username));
    }
  }
};

const getDataAction = (id, data, to) => ({
  type: GET_DATA,
  data,
  to,
  id
});

const sendData = (id, data, to = MAIN) => {
  //TODO PRIVATE
  socketApp.dispatch(getDataAction(id, data, to));
};

module.exports = {
  setSocketApp,
  createMessage,
  createGame,
  send,
  sendData
};