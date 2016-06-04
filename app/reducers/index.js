import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import participants from './participants'

export default combineReducers({
  page,
  user,
  participants
})