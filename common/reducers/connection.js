import { combineReducers } from 'redux'
import {
  DISCONNECT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT
} from '../constants'

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