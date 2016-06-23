import { combineReducers } from 'redux'

import main from '../../common/reducers/state'
import connection from '../../common/reducers/connection'
import requestErrors from './requestErrors'
import games from './games'

export default combineReducers({
  main,
  games,
  connection,
  requestErrors
})