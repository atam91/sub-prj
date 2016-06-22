const {
  GAME_JOIN,
  GAME_MOVE
} = require('../../common/constants');

const initialPlayer = (sign) => ({
  name: null,
  wins: 0,
  sign
});

const initialState {
  players: [
    initialPlayer('X'),
    initialPlayer('O')
  ],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  moves: null
};

const join = (state, { user, player }) => {
  if (state.players[player].name) return;
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

const move = (state, action) => {

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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