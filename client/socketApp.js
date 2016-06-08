import clientSocketMiddleware, { clientSocketService } from '../common/lib/SocketApp';
import {
  stateReducer,
  connectionReducer,
  clientDescription
} from '../common/SocketAppDefine';












//socketClient
module.exports = {
  requestActions,
  stateReducer,
  connectionReducer,
  socketService
};