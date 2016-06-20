import { combineReducers } from 'redux'
import { DISCONNECT } from '../lib/SocketApp'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT
} from '../constants/SocketEvents'

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

export default combineReducers({user})

export const isAuth = (state) => state.user.auth;

export const getUsername = (state) => state.user.name;