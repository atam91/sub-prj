import { combineReducers } from 'redux'
import {
  WATCH_GAME,
  DISCONNECT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_EVENT
} from '../constants'

const initialUser = {
  auth: false,
  name: ''
};

const initialGame = {
  id: null,
  game: null
}

const game = (state = initialGame, action) => {
  switch (action.type) {
    case WATCH_GAME:
      return { id: action.id, game: action.game };

    default:
      return state;
  }
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

export default combineReducers({user, game})

export const getUser = (state) => state.user;
export const getAuth = (state) => state.user.auth;
export const getUsername = (state) => state.user.name;