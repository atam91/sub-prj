const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT,
} = require('../constants/ApiEvents');

const initialState = {
  auth: false,
  username: ''
}

module.exports = function(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, auth: true, username: payload };

    case LOGOUT_EVENT:
    case LOGIN_FAILURE:
      return { ...state, auth: false, username: '' };

    default:
      return state;
  }
};