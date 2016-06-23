const {
  INIT,
  GAME_JOIN,
  GAME_MOVE,
  GAME_RESTART
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

const getPlayer = (state, { name }) => (
  state.players.reduce(
    (prev, player, index) => {
      if (prev === false && player.name === name) {
        return index;
      }
      return prev;
    },
    false
  )
);

const join = (state, { user, player }) => {
  if (state.players[player].name) return;
  if (!user.auth) return;
  let newState = { ...state };

  newState.players[player].name = user.name;
  if (newState.players.every(p => p.name)) {
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

    case GAME_RESTART:
      const player = getPlayer(state, action.user);
      if (player === false) return state;

      return {
        ...initState(),
        players: state.players,
        moves: player
      };

    default:
      return state;
  }
};

const getData = ({ players }) => ({
  text: players.filter(p => p.name).map(p => p.name).join(', ')
});

module.exports = {
  getData,
  reducer
};