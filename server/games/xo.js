const { join, getActivePlayer, nextPlayerMove } = require('./base');

const initPlayer = (sign) => ({
  name: null,
  wins: 0,
  sign
});

const initBoard = () => ({
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
});

const initState = () => ({
  ...initBoard(),
  players: [
    initPlayer('X'),
    initPlayer('O')
  ],
  moves: -1
});

const move = (state, { user, move }) => {
  const activePlayer = getActivePlayer(state);
  if (activePlayer.name !== user.name) return;
  let newState = { ...state };

  const { x, y } = move;
  newState.board[y][x] = activePlayer.sign;
  nextPlayerMove(newState);

  return newState;
};

const restart = (state) => ({ ...state, ...initBoard() });

const getData = ({ players }) => ({
  text: players.filter(p => p.name).map(p => p.name).join(', ')
});


module.exports = {
  initState,
  join,
  move,
  restart,
  getData
};