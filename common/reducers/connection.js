const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT
} = require('../constants/SocketEvents');

// USE ONLY combine({}, ...) for immutable states
const combine = Object.assign;

const initialUser = {
  auth: false,
  name: ''
};

const initialState = {
  user: initialUser
};

module.exports = function(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return combine({}, state, { user: payload });

    case LOGOUT_EVENT:
    case LOGIN_FAILURE:
      return combine({}, state, { user: initialUser });

    default:
      return state;
  }
};