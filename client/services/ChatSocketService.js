import {
  MESSAGES,
  MESSAGE_SEND,
  MESSAGE_EVENT
} from '../../common/constants/ApiEvents'
import SocketService, { generateRequestMiddleware } from './SocketService'

const middleware = generateRequestMiddleware([MESSAGE_SEND]);
export { middleware as chatSocketMiddleware }

export default function socketService(socket, dispatch) {
  const service = SocketService(socket, dispatch);

  service.handleSocketEvent(MESSAGE_EVENT);
  service.handleSocketEvent(MESSAGES);
}