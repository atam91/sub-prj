const { all } = require('../../common/utils');
const {
  INIT,
  GAME_JOIN,
  GAME_MOVE
} = require('../../common/constants');

const initialPlayer = (sign, next) => ({
  name: null,
  wins: 0,
  sign,
  next
});

const initState = () => ({
  players: [
    initialPlayer('X', 1),
    initialPlayer('O', 0)
  ],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  moves: -1
});

const join = (state, { user, player }) => {
  if (state.players[player].name) return;
  const name = user.name || 'guest';
  let newState = { ...state };

  newState.players[player].name = name;
  if (all(newState.players, p => p.name)) {
    newState.moves = player;
  }

  return newState;
};

const move = (state, { user, move }) => {
  if (state.players[state.moves].name !== user.name) return;
  let newState = { ...state };

  const { x, y } = move;
  const player = state.players[state.moves];
  newState.board[y][x] = player.sign;
  newState.moves = player.next;

  return newState;
};

const reducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return initState();

    case GAME_JOIN:
      return join(state, action) || state;

    case GAME_MOVE:
      return move(state, action) || state;

    default:
      return state;
  }
};

module.exports = {
  reducer
};