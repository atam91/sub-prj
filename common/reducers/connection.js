const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT
} = require('../constants/SocketEvents');

const user = {
  auth: false,
  name: ''
};

const initialState = { user };

module.exports = function(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };

    case LOGOUT_EVENT:
    case LOGIN_FAILURE:
      return { ...state, user };

    default:
      return state;
  }
};