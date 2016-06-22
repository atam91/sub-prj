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
  moves: null
});

const join = (state, { user, player }) => {
  if (state.players[player].name) return;
  if (!user.name || getPlayer(state, user.name)) return;
  let newState = { ...state };

  newState.players[player].name = user.name;

  if (newState.players.reduce(
    (prev, player) => (prev && player.name),
    true
  )) {
    newState.moves = user.name;
  }

  return newState;
};

const getPlayer = (state, name) => {
  let result;

  state.players.forEach((player, index) => {
    if (player.name === name) {
      result = player;
    }
  });

  return result;
};

const move = (state, { user, move }) => {
  if (state.moves !== user.name) return;
  let newState = { ...state };

  const { x, y } = move;
  const player = getPlayer(state, user.name);
  newState.board[y][x] = player.sign;
  newState.moves = state.players[player.next].name;

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