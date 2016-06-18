import { combineReducers } from 'redux'
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
      return action.payload;

    case LOGOUT_EVENT:
    case LOGIN_FAILURE:
      return initialUser;

    default:
      return state;
  }
};

export default combineReducers({user})