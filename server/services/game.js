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
  GAME_MOVE
} = require('../../common/constants');
const chat = require('./chat');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

const states = {};

const createGame = (game, state) => ({
  id: v4(),
  state,
  game
});

const startGame = (connection, type) => {
  const state = games[type].reducer(undefined, { type: INIT });
  const game = createGame(type, state);

  states[game.id] = game;
  chat.sendGame(connection, game);
};

const gameState = (id) => ({
  type: GAME_STATE,
  state: states[id].state,
  id
});

const watchGame = (id) => ({
  type: WATCH_GAME,
  game: states[id].game,
  id
});

const gameAction = (connection, action) => {
  const id = action.id;
  if (!states[id]) {
    console.log('WRONG REQUEST', `no data for ${id}`);
    return;
  }

  const game = games[states[id].game];
  const state = states[id].state;

  action.user = connection.getUser();
  const newState = game.reducer(state, action);

  if (newState !== state) {
    states[id].state = newState;
    socketApp.io.to(id).emit(ACTION, gameState(id));
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
      gameAction(connection, action);
      break;
  }
};

module.exports = {
  setSocketApp,
  handler
};