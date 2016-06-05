import { combineReducers } from 'redux'
import user from './user'
import participants from './participants'

export default combineReducers({
  user,
  participants
})