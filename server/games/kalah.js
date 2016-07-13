const { join, getActivePlayer, nextPlayerMove } = require('./base');
const { getIndex } = require('../../common/utils');

const initPlayer = (sign) => ({
  name: null,
  score: 0,
  sign
});

const initBoard = () => {
  const board = [
    0, 6, 6, 6, 6, 6, 6,
    0, 6, 6, 6, 6, 6, 6
  ];

  const animation = {
    counter: null,
    position: null
  };

  return {
    board,
    animation,
    wins: null
  };
};

const initState = () => {
  const map = [
    null, 'S', 'S', 'S', 'S', 'S', 'S',
    null, 'N', 'N', 'N', 'N', 'N', 'N'
  ];

  return {
    ...initBoard(),
    players: [
      initPlayer('N'),
      initPlayer('S')
    ],
    moves: -1,
    map
  };
};

/*const checkPosition = (newState) => {
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
};*/

const getWinner = (state) => getIndex(state.players, p => p.sign === state.wins);

const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;

  const { index } = move;
  if (state.map[index] !== activePlayer.sign) return;
  if (!state.board[index]) return;
  if (state.animation.counter) return;

  let newState = { ...state };

  newState.animation.counter = state.board[index];
  newState.animation.position = index + 1;
  newState.board[index] = 0;

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