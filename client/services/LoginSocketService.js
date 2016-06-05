import { 
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS
} from '../../common/constants/ApiEvents'
import SocketService, { generateRequestMiddleware } from './SocketService'

const middleware = generateRequestMiddleware([LOGIN_REQUEST, LOGOUT_SEND]);
export { middleware as loginSocketMiddleware }

export default function socketService(socket, dispatch) {
  const service = SocketService(socket, dispatch);

  service.handleSocketResponse(LOGIN_RESPONSE, LOGIN_SUCCESS, LOGIN_FAILURE);
  service.handleSocketEvent(LOGOUT_EVENT);
  service.handleSocketEvent('disconnect', LOGOUT_EVENT);

  service.handleSocketEvent(PARTICIPANTS);
}