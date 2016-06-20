import { StatefulSocketConnection } from '../common/lib/SocketApp';
import reducer, * as fromConnection from '../common/reducers/connection';

export default (socket) => {
  const connection = StatefulSocketConnection(socket, reducer);
  const state = () => connection.getState();

  connection.isAuth = () => fromConnection.isAuth(state());
  connection.getUsername = () => fromConnection.getUsername(state());

  return connection;
};