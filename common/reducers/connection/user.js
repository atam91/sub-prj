import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT,
  DISCONNECT
} from '../../constants'

const initialUser = {
  auth: false,
  name: ''
};

const user = (state = initialUser, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        auth: true,
        name: action.name
      };

    case LOGIN_FAILURE:
    case LOGOUT_EVENT:
    case DISCONNECT:
      return initialUser;

    default:
      return state;
  }
};

export default user

export const getAuth = (state) => state.auth;
export const getName = (state) => state.name;