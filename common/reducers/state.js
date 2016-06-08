const {
  PARTICIPANTS,
  MESSAGE_EVENT,
  STATE
} = require('../constants/ApiEvents');

const initialState = {
  participants: [],
  messages: []
}

module.exports = function(state = initialState, action = {}) {
  switch (action.type) {
    case STATE:
      return action.payload;

    case PARTICIPANTS:
      return { ...state, participants: action.payload };

    case MESSAGE_EVENT:
      return { ...state, messages: [ ...state.messages, action.payload ] };

    default:
      return state;
  }
};
