const { join, getActivePlayer, getWinner, nextPlayerMove } = require('./base');
const { getIndex } = require('../../common/utils');

const FIRST = 1;
const NORTH = 'NORTH';
const SOUTH = 'SOUTH';

const initPlayer = (sign) => ({
  name: null,
  score: 0,
  sign,
  home: ({[NORTH]: 0, [SOUTH]: 7})[sign],
  skip: ({[NORTH]: 7, [SOUTH]: 0})[sign]
});

const initBoard = () => {
  const board = [
    0, 6, 6, 6, 6, 6, 6,
    0, 6, 6, 6, 6, 6, 6
  ];

  const animation = {
    active: false,
    counter: null,
    position: null,
    afterState: null,
    finished: true
  };

  return {
    board,
    animation,
    wins: null
  };
};

const initState = () => {
  const map = [
    null, SOUTH, SOUTH, SOUTH, SOUTH, SOUTH, SOUTH,
    null, NORTH, NORTH, NORTH, NORTH, NORTH, NORTH
  ];

  return {
    ...initBoard(),
    players: [
      initPlayer(NORTH),
      initPlayer(SOUTH)
    ],
    moves: -1,
    map
  };
};

const opposite = [
  null, 13, 12, 11, 10, 9, 8,
  null, 6,  5,  4,  3,  2, 1
];

const nextPosition = (index, length) => (index + 1) % length;

const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;

  const { index } = move;
  if (state.map[index] !== activePlayer.sign) return;
  if (!state.board[index]) return;
  if (state.animation.active) return;

  const newState = { ...state };
  newState.animation = {
    active: true,
    counter: state.board[index],
    position: nextPosition(index, state.board.length),
    finished: false
  };
  newState.board[index] = 0;

  return newState;
};

const animate = (state) => {
  const { animation, board } = state;
  if (!animation.active) return state;
  const activePlayer = getActivePlayer(state);

  if (animation.position === activePlayer.skip) {
    animation.position = nextPosition(animation.position, board.length);
  }

  board[animation.position]++;
  animation.counter--;

  if (animation.counter <= 0) {
    state.animation.active = false;
  } else {
    animation.position = nextPosition(animation.position, board.length);
  }

  return state;
};

const countFreeSeeds = (state, sign) => {
  const { board, map } = state
  let result = 0;

  board.forEach((pit, index) => {
    if (map[index] === sign) {
      result += pit;
    }
  });

  return result;
};

const afterAnimation = (state) => {
  const { animation, board, map } = state;
  const activePlayer = getActivePlayer(state);

  if (
    map[animation.position] === activePlayer.sign
      &&
    board[animation.position] === FIRST
  ) {
    const oppIndex = opposite[animation.position];

    if (oppIndex && board[oppIndex]) {
      board[activePlayer.home] += FIRST + board[oppIndex];
      board[animation.position] = 0;
      board[oppIndex] = 0;
    }
  }

  if (animation.position !== activePlayer.home) {
    nextPlayerMove(state);
  }

  const nextPlayer = getActivePlayer(state);
  if (countFreeSeeds(state, nextPlayer.sign) === 0) {
    const north = state.board[0] + countFreeSeeds(state, NORTH);
    const south = state.board[7] + countFreeSeeds(state, SOUTH);

    if (north > south) {
      state.wins = NORTH;
    } else if (south > north) {
      state.wins = SOUTH;
    }

    if (state.wins) {
      const winner = getWinner(state);
      state.players[winner].score++;
    }
  }

  animation.finished = true;

  return state;
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
  animate,
  afterAnimation,
  restart,
  getData
};