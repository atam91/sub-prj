import { combineReducers } from 'redux';
import chat from './chat';
import users from './users';

export default combineReducers({
  chat,
  users
})