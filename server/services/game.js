const console = require('../lib/console')('game', 'magenta');
import { v4 } from 'node-uuid'
import * as fromConnection from '../../common/reducers/connection';
const gameReducers = require('../games');
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

const games = {};

const createGame = (connection, type) => ({
  from: connection.getUsername(),
  id: v4(),
  type
});

const startGame = (connection, type) => {
  const reducer = gameReducers[type].reducer;
  const state = reducer(undefined, { type: INIT });
  const game = createGame(connection, type);

  games[game.id] = {
    state,
    reducer
  };
  chat.sendGame(game);
};

const gameState = (id) => ({
  type: GAME_STATE,
  state: games[id].state,
  id
});

const watchGame = (id) => ({
  type: WATCH_GAME,
  id
});

const gameAction = (connection, action) => {
  const id = action.id;
  if (!games[id]) {
    console.log('WRONG REQUEST', `no data for ${id}`);
    return;
  }
  const game = games[id];

  action.user = connection.getUser();
  const newState = game.reducer(game.state, action);

  if (newState !== game.state) {
    games[id].state = newState;
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