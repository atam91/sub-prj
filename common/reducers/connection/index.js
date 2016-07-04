import { combineReducers } from 'redux'
import user, * as fromUser from './user'
import games from './games'

export default combineReducers({ user, games })

export const getUser = (state) => state.user;
export const getAuth = (state) => fromUser.getAuth(state.user);
export const getUsername = (state) => fromUser.getName(state.user);