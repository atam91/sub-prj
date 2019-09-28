const console = require('../lib/console')('game', 'magenta');
import { v4 } from 'node-uuid'
import * as fromConnection from '../../common/reducers/connection';
const games = require('../../common/games');
const {
  MAIN,
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
const { deepCopy, deepEqual } = require('../../common/utils');
const chat = require('./chat');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

const getGameData = (id) => gamesStore[id].data;

const createGame = (connection, type) => ({
  from: connection.getUsername(),
  id: v4(),
  data: {},
  type
});

const gameState = (id, state) => ({
  type: GAME_STATE,
  state: state || gamesStore[id].state,
  id
});

const watchGame = (id) => ({
  type: WATCH_GAME,
  id
});


const gamesStore = {};
const gameDataRecipients = {};

const startGame = (connection, type, to) => {
  const state = games[type].initState();
  const game = chat.createGame(type);

  gamesStore[game.id] = { state, type };
  chat.send(connection, game, to);

  if (to === MAIN) {
    gameDataRecipients[game.id] = MAIN;
  } else {
    gameDataRecipients[game.id] = [to, connection.getUsername()];
  }
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

  if (newState === state) return;

  let afterState;
  if (newState.animation && newState.animation.active) {
    const game = getGameService(type);
    afterState = deepCopy(newState);

    while (afterState.animation.active) {
      afterState = game.animate(afterState);
    }
    afterState = game.afterAnimation(afterState);
    newState.animation.afterState = afterState;
  }
  gamesStore[id].state = afterState || newState;
  socketApp.io.to(id).emit(ACTION, gameState(id, newState));

  const newData = games[type].getData(gamesStore[id].state);
  if (!deepEqual(getGameData(id), newData)) {
    gamesStore[id].data = newData;
    chat.sendData(id, newData, gameDataRecipients[id]);
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

const getGameService = (type) => games[type];

const handler = (connection, action) => {
  switch (action.type) {
    case GAME_START:
      startGame(connection, action.game, action.to);
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