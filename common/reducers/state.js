const { STATE } = require('../lib/SocketApp');
const {
  PARTICIPANTS,
  MESSAGE,
  CLEAR
} = require('../constants/SocketEvents');

// USE ONLY combine({}, state, ...) for immutable states, like { ...state, ... }
const combine = Object.assign;

const initialState = {
  participants: [],
  messages: []
}

module.exports = function(state = initialState, { type, payload }) {
  switch (type) {
    case STATE:
      return payload;

    case PARTICIPANTS:
      return combine({}, state, { participants: payload });

    case MESSAGE:
      return combine({}, state, { 
        messages: state.messages.concat(payload)
      });

    case CLEAR:
      return combine({}, state, { messages: [] });

    default:
      return state;
  }
};
