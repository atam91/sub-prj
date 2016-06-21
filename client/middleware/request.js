import { requestListener } from '../services/socket'

export default () => next => action => {
  requestListener(action);
  return next(action);
}