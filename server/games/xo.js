const { join, getActivePlayer, nextPlayerMove } = require('./base');
const { getIndex } = require('../../common/utils');

const initPlayer = (sign) => ({
  name: null,
  score: 0,
  sign
});

const initBoard = () => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  return {
    board,
    marks: board,
    wins: null
  };
};

const initState = () => {
  return {
    ...initBoard(),
    players: [
      initPlayer('X'),
      initPlayer('O')
    ],
    moves: -1
  };
};

const checkPosition = (newState) => {
  const rows = newState.board;
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
  return newState;
};

const getWinner = (state) => getIndex(state.players, p => p.sign === state.wins);

const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;
  let newState = { ...state };

  const { x, y } = move;
  newState.board[y][x] = activePlayer.sign;
  newState = checkPosition(newState);

  if (newState.wins) {
    const winner = getWinner(newState);
    newState.players[winner].score++;
  }

  nextPlayerMove(newState);
  return newState;
};

const restart = (state) => ({ ...state, ...initBoard() });

const getData = ({ players }) => ({
  text: players.filter(p => p.name).map(p => {
    const score = p.score && (' ' + p.score) || '';
    return p.name + score;
  }).join(', ')
});

module.exports = {
  initState,
  join,
  move,
  restart,
  getData
};