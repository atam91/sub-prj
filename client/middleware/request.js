import { requestMiddleware } from '../services/socket'

export default () => next => action => {
  requestMiddleware(action);
  return next(action);
}