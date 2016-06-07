const {
  PARTICIPANTS,
  MESSAGE_EVENT
} = require('../constants/ApiEvents');

const initialState = {
  participants: [],
  messages: []
}

const reducer = (state = initialState, { type, payload }) {
  switch (action.type) {
    case PARTICIPANTS:
      return { ...state, participants: action.payload };

    case MESSAGE_EVENT:
      return { ...state, messages: [ ...state.messages, payload ] };

    default:
      return state;
  }
};

module.exports = reducer;