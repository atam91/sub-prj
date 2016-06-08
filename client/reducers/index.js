import { combineReducers } from 'redux'

import main from '../../common/reducers/state'
import connection from '../../common/reducers/connection'
import requestErrors from './requestErrors'

export default combineReducers({
  main,
  connection,
  requestErrors
})