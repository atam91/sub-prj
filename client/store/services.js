import * as socket from '../services/socket'

export default (store) => {
  socket.start(store.dispatch);
}