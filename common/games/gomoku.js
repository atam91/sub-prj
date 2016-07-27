const { initPlayer, join, getActivePlayer, getWinner, nextPlayerMove, getData } = require('./base');
const { getIndex, deepCopy } = require('../../common/utils');

const SIZE = 15;
const BLACK = 'BLACK';
const WHITE = 'WHITE';

const initBoard = () => {
  const emptyRow = [];
  for (let i = 0; i < SIZE; i++) {
    emptyRow.push(null);
  }

  const board = [];
  for (let i = 0; i < SIZE; i++) {
    board.push(deepCopy(emptyRow));
  }

  return {
    board,
    marks: deepCopy(board),
    wins: null
  };
};

const initState = () => {
  return {
    ...initBoard(),
    players: [
      initPlayer(WHITE),
      initPlayer(BLACK)
    ],
    moves: -1
  };
};

const checkPosition = (newState) => {
  /*const rows = newState.board;
  const { marks } = initBoard();
  let wins = null;

  for (let i = 0; i <= 2; i++ ) {
    if (rows[i][0] && rows[i][0] === rows[i][1] && rows[i][1] === rows[i][2]) {
      wins = rows[i][0];
      marks[i][0] = true;
      marks[i][1] = true;
      marks[i][2] = true;
    }
    if (rows[0][i] && rows[0][i] === rows[1][i] && rows[1][i] === rows[2][i]) {
      wins = rows[0][i];
      marks[0][i] = true;
      marks[1][i] = true;
      marks[2][i] = true;
    }
  }

  if (rows[0][0] && rows[0][0] === rows[1][1] && rows[1][1] === rows[2][2]) {
    wins = rows[0][0];
    marks[0][0] = true;
    marks[1][1] = true;
    marks[2][2] = true;
  }

  if (rows[0][2] && rows[0][2] === rows[1][1] && rows[1][1] === rows[2][0]) {
    wins = rows[1][1];
    marks[0][2] = true;
    marks[1][1] = true;
    marks[2][0] = true;
  }

  newState.marks = marks;
  newState.wins = wins;
  return newState;*/
};

const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;
  let newState = { ...state };

  const { x, y } = move;
  if (state.board[y][x]) return;
  newState.board[y][x] = activePlayer.sign;
  //newState = checkPosition(newState);

  if (newState.wins) {
    const winner = getWinner(newState);
    newState.players[winner].score++;
  }

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