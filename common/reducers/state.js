const { STATE } = require('../lib/SocketApp');
const {
  PARTICIPANTS,
  MESSAGE
} = require('../constants/SocketEvents');

// USE ONLY combine({}, ...) for immutable states
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

    default:
      return state;
  }
};
