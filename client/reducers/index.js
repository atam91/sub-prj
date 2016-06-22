import { combineReducers } from 'redux'

import main from '../../common/reducers/state'
import connection from '../../common/reducers/connection'
import requestErrors from './requestErrors'
import game from './game'

export default combineReducers({
  main,
  game,
  connection,
  requestErrors
})