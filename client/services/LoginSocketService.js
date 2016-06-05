import { 
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  LOGOUT_SUCCESS,
  PARTICIPANTS
} from '../../common/constants/ApiEvents'
import SocketService, { generateRequestMiddleware } from './SocketService'

const middleware = generateRequestMiddleware([LOGIN_REQUEST, LOGOUT_REQUEST]);
export { middleware as loginSocketMiddleware }

export default function socketService(socket, dispatch) {
  const service = SocketService(socket, dispatch);

  service.handleSocketResponse(LOGIN_RESPONSE, LOGIN_SUCCESS, LOGIN_FAILURE);
  service.handleSocketResponse(LOGOUT_RESPONSE, LOGOUT_SUCCESS);
  service.handleSocketEvent('disconnect', LOGOUT_SUCCESS);

  service.handleSocketEvent(PARTICIPANTS);
}