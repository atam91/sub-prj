import * as socket from '../services/socket'

export default (store) => {
  socket.setDispatch(store.dispatch);
}