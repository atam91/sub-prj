const console = require('../lib/console')('game', 'magenta');
import { v4 } from 'node-uuid'
import * as fromConnection from '../../common/reducers/connection';
const games = require('../games');
const {
  INIT,
  GAME,
  WATCH_GAME,
  ACTION,
  GAME_START,
  GAME_WATCH,
  GAME_STATE,
  GAME_JOIN,
  JOIN_GAME,
  GAME_MOVE,
  GAME_RESTART
} = require('../../common/constants');
const chat = require('./chat');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };
const getGameData = (id) => socketApp.getState().games[id].data;

const createGame = (connection, type) => ({
  from: connection.getUsername(),
  id: v4(),
  data: {},
  type
});

const gameState = (id) => ({
  type: GAME_STATE,
  state: gamesStore[id].state,
  id
});

const watchGame = (id) => ({
  type: WATCH_GAME,
  id
});


const gamesStore = {};

const startGame = (connection, type) => {
  const state = games[type].initState();
  const game = createGame(connection, type);

  gamesStore[game.id] = { state, type };
  chat.sendGame(game);
};

const gameAction = (connection, action) => {
  const user = connection.getUser();
  if (!user.auth) return;
  action.user = user;

  const id = action.id;
  if (!gamesStore[id]) {
    console.log('Wrong action.id', user, action);
    return;
  }

  const { state, type } = gamesStore[id];
  const newState = gameReducer(type, state, action);

  if (newState !== state) {
    gamesStore[id].state = newState;
    socketApp.io.to(id).emit(ACTION, gameState(id));

    const newData = games[type].getData(newState);
    if (getGameData(id) !== newData) {
      chat.sendGameData(id, newData);
    }
  }
};

const gameReducer = (type, state, action) => {
  const game = games[type];
  
  switch (action.type) {
    case GAME_JOIN:
      return game.join(state, action) || state;

    case GAME_MOVE:
      return game.move(state, action) || state;

    case GAME_RESTART:
      return game.restart(state);
  }
};


const handler = (connection, action) => {
  switch (action.type) {
    case GAME_START:
      startGame(connection, action.game);
      break;

    case GAME_WATCH:
      connection.dispatch(watchGame(action.id));
      connection.getSocket().join(action.id);
      connection.dispatch(gameState(action.id));
      break;

    case GAME_JOIN:
    case GAME_MOVE:
    case GAME_RESTART:
      gameAction(connection, action);
      break;
  }
};

module.exports = {
  setSocketApp,
  handler
};