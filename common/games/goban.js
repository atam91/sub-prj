const { initPlayer, join, getActivePlayer, getWinner, nextPlayerMove, getData } = require('./base');
const { getIndex, deepCopy } = require('../../common/utils');

const STATE_SETTINGS = 'STATE_SETTINGS';
const STATE_PREPARING = 'STATE_PREPARING';
const STATE_PLAYING = 'STATE_PLAYING';
const STATE_SCORING = 'STATE_SCORING';

const BLACK = 'BLACK';
const WHITE = 'WHITE';

const initBoard = (size) => {
  const emptyRow = [];
  for (let i = 0; i < size; i++) {
    emptyRow.push(null);
  }

  const board = [];
  for (let i = 0; i < size; i++) {
    board.push(deepCopy(emptyRow));
  }

  return {
    board,
    size
  };
};

const initState = () => {
  return {
    state: STATE_SETTINGS,
    players: [
      initPlayer(WHITE),
      initPlayer(BLACK)
    ],
    moves: -1
  };
};


const checkPosition = (newState, { x, y }) => {
  const { board } = newState;

};

const move = (state, { user, move }) => {
  let newState = { ...state };

  if (state.state === STATE_SETTINGS) {
    if (!move.size) return;
    if (move.size !== 9 && move.size !== 13 && move.size !== 19) return;
    if (!state.players.find(p => p.name === user.name)) return;

    Object.assign(newState, initBoard(move.size), { state: STATE_PREPARING });

    return newState;
  }



  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;
  ///let newState = { ...state };

  const { x, y } = move;
  if (state.board[y][x]) return;
  newState.board[y][x] = activePlayer.sign;
  checkPosition(newState, move);

  /**if (newState.wins) {
    const winner = getWinner(newState);
    newState.players[winner].score++;
  }**/

  nextPlayerMove(newState);
  return newState;
};

const restart = (state) => ({ ...state, ...initBoard() });

module.exports = {
  initState,
  join,
  move,
  restart,
  getData
};
