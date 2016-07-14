import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import request from '../middleware/request'
import notifier from '../middleware/notifier'
import reload from '../middleware/reload'
import animation from '../middleware/animation'

const middlewares = [
  thunk,
  request,
  notifier,
  reload,
  animation
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

export default middlewares;