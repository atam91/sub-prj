import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../constants/User'
import { PARTICIPANTS } from '../constants/Socket'
import SocketService, {generateMiddleware} from './SocketService'

const middleware = generateMiddleware([LOGIN_REQUEST, LOGOUT_REQUEST]);
export { middleware as loginSocketMiddleware }

export default function socketService(socket, dispatch) {
  const service = SocketService(socket, dispatch);

  service.handleSocketResponse('login_response', LOGIN_SUCCESS, LOGIN_FAILURE);
  service.handleSocketResponse('logout_response', LOGOUT_SUCCESS);

  service.handleSocketEvent('disconnect', LOGOUT_SUCCESS);
  service.handleSocketEvent('participants', PARTICIPANTS, true);
}