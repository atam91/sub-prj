import { v4 } from 'node-uuid'
import * as fromConnection from '../../common/reducers/connection';
const games = require('../games');
const {
  INIT,
  GAME,
  ACTION,
  GAME_WATCH,
  GAME_STATE,
  GAME_JOIN,
  GAME_MOVE
} = require('../../common/constants');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

const states = {};

const createGame = (type, state) => ({
  id: v4(),
  state,
  type
});

const startGame = (type) => {
  const state = games[type].reducer(undefined, { type: INIT });
  const game = createGame(type, state);

  states[game.id] = game;

  socketApp.dispatch({ type: GAME, game });
};

const gameState = (id) => ({
  type: GAME_STATE,
  state: states[id].state,
  id
});

const gameAction = (connection, action) => {
  const id = action.id;
  const game = games[states[id].type];
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
    case GAME_WATCH:
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