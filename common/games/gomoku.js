const { initPlayer, join, getActivePlayer, getWinner, nextPlayerMove, getData } = require('./base');
const { getIndex, deepCopy } = require('../../common/utils');

const EXPECT = 5;
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


const checkPosition = (newState, { x, y }) => {
  const { board } = newState;
  const sign = board[y][x];

  const initCounter = () => {
    const obj = {};

    let counter = 1;
    let dots = [{ x, y }];

    const markDot = (dot) => {
      counter++;
      dots.push(dot);

      if (counter > EXPECT) return false;
    };

    obj.checkDot = (dot) => {
      if (newState.board[dot.y][dot.x] !== sign) {
        return false;
      }

      return markDot(dot);
    };

    obj.check = () => {
      if (counter === EXPECT) {
        for (let dot of dots) {
          newState.marks[dot.y][dot.x] = true;
          newState.wins = sign;
        }
      }
    };

    return obj;
  };

  const checkHorizotal = () => {
    const counter = initCounter();

    for (let delta = 1; (x - delta) >= 0; delta++) {
      if (counter.checkDot({ y, x: (x - delta) }) === false) break;
    }
    for (let delta = 1; (x + delta) < SIZE; delta++) {
      if (counter.checkDot({ y, x: (x + delta) }) === false) break;
    }

    counter.check();
  };

  const checkVertical = () => {
    const counter = initCounter();

    for (let delta = 1; (y - delta) >= 0; delta++) {
      if (counter.checkDot({ x, y: (y - delta) }) === false) break;
    }
    for (let delta = 1; (y + delta) < SIZE; delta++) {
      if (counter.checkDot({ x, y: (y + delta) }) === false) break;
    }

    counter.check();
  };

  const checkFall = () => {
    const counter = initCounter();

    for (let delta = 1; (x - delta) >= 0 && (y - delta) >= 0; delta++) {
      let res = counter.checkDot({
        x: (x - delta),
        y: (y - delta)
      });

      if (res === false) break;
    }
    for (let delta = 1; (x + delta) < SIZE && (y + delta) < SIZE; delta++) {
      let res = counter.checkDot({
        x: (x + delta),
        y: (y + delta)
      });

      if (res === false) break;
    }

    counter.check();
  };

  const checkRise = () => {
    const counter = initCounter();

    for (let delta = 1; (x - delta) >= 0 && (y + delta) < SIZE; delta++) {
      let res = counter.checkDot({
        x: (x - delta),
        y: (y + delta)
      });

      if (res === false) break;
    }
    for (let delta = 1; (y - delta) >= 0 && (x + delta) < SIZE; delta++) {
      let res = counter.checkDot({
        x: (x + delta),
        y: (y - delta)
      });

      if (res === false) break;
    }

    counter.check();
  };

  checkHorizotal();
  checkVertical();
  checkFall();
  checkRise();
};

const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;
  let newState = { ...state };

  const { x, y } = move;
  if (state.board[y][x]) return;
  newState.board[y][x] = activePlayer.sign;
  checkPosition(newState, move);

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