import { combineReducers } from 'redux'
import user, * as fromUser from './connection/user'
import games, { currentGame } from './connection/games'

export default combineReducers({ user, currentGame, games })

export const getUser = (state) => state.user;
export const getAuth = (state) => fromUser.getAuth(state.user);
export const getUsername = (state) => fromUser.getName(state.user);