const join = (state, { user, player }) => {
  if (state.players[player].name) return;
  const newState = { ...state };

  newState.players[player].name = user.name;
  if (newState.players.every(p => p.name)) {
    newState.moves = player;
  }
  return newState;
};

const nextPlayerMove = (newState) => {
  newState.moves++;
  if (newState.moves >= newState.players.length) {
    newState.moves = 0;
  }
  return newState;
};

const getActivePlayer = (state) => state.players[state.moves];

module.exports = {
  join,
  nextPlayerMove,
  getActivePlayer
}