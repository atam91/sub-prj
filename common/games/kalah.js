const { join, getActivePlayer, getWinner, nextPlayerMove, getData } = require('./base');
const { deepCopy } = require('../../common/utils');

const ONE = 1;
const SIX = 6;
const EMPTY = 0;
const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const NORTH_HOME = 0;
const SOUTH_HOME = 7;

const playerOptions = {
  [NORTH]: {
    home: NORTH_HOME,
    skip: SOUTH_HOME
  },
  [SOUTH]: {
    home: SOUTH_HOME,
    skip: NORTH_HOME
  }
};

const initPlayer = (sign) => ({
  name: null,
  score: 0,
  sign
});

const initBoard = () => {
  const board = [
    EMPTY, SIX, SIX, SIX, SIX, SIX, SIX,
    EMPTY, SIX, SIX, SIX, SIX, SIX, SIX
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

const initState = () => ({
  ...initBoard(),
  players: [
    initPlayer(NORTH),
    initPlayer(SOUTH)
  ],
  moves: -1
});

const boardMap = [
  null, SOUTH, SOUTH, SOUTH, SOUTH, SOUTH, SOUTH,
  null, NORTH, NORTH, NORTH, NORTH, NORTH, NORTH
];

const oppositePit = [
  null, 13, 12, 11, 10, 9, 8,
  null, 6,  5,  4,  3,  2, 1
];

const nextPosition = (index, length) => (index + 1) % length;


const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;

  const { index } = move;
  if (boardMap[index] !== activePlayer.sign) return;
  if (!state.board[index]) return;
  if (state.animation.active) return;

  const newState = deepCopy(state);
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

  const next = () => nextPosition(animation.position, board.length);

  if (animation.position === playerOptions[activePlayer.sign].skip) {
    animation.position = next();
  }

  board[animation.position]++;
  animation.counter--;

  if (animation.counter <= 0) {
    state.animation.active = false;
  } else {
    animation.position = next();
  }

  return state;
};


const countFreeSeeds = (state, sign) => (
  state.board
    .filter((pit, index) => (boardMap[index] === sign))
    .reduce((sum, cur) => sum + cur, 0)
);


const afterAnimation = (state) => {
  const { animation, board } = state;
  const activePlayer = getActivePlayer(state);
  const playerHome = playerOptions[activePlayer.sign].home;

  if (
    boardMap[animation.position] === activePlayer.sign
      &&
    board[animation.position] === ONE
  ) {
    const oppIndex = oppositePit[animation.position];

    if (board[oppIndex]) {
      board[playerHome] += ONE + board[oppIndex];
      board[animation.position] = 0;
      board[oppIndex] = 0;
    }
  }

  if (animation.position !== playerHome) {
    nextPlayerMove(state);
  }

  checkPosition(state);
  animation.finished = true;

  return state;
};

const checkPosition = (state) => {
  const { sign } = getActivePlayer(state);
  if (countFreeSeeds(state, sign) === 0) {
    const north = state.board[NORTH_HOME] + countFreeSeeds(state, NORTH);
    const south = state.board[SOUTH_HOME] + countFreeSeeds(state, SOUTH);

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
};

const restart = (state) => ({ ...state, ...initBoard() });

module.exports = {
  initState,
  boardMap,
  join,
  move,
  animate,
  afterAnimation,
  restart,
  getData
};