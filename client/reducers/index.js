import { combineReducers } from 'redux'

import common from '../../common/reducers/common'
import connection from '../../common/reducers/connection'
import requestErrors from './requestErrors'
import games from './games'
import ui from './ui'
import chatManager from './chatManager'

export default combineReducers({
  common,
  connection,
  requestErrors,
  games,
  ui,
  chatManager
})