import { combineReducers } from 'redux'
import user from './user'
import participants from './participants'
import chat from './chat'

export default combineReducers({
  user,
  participants,
  chat
})