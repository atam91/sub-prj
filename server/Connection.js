import { StatefulSocketConnection } from './lib/SocketApp';
import reducer, * as fromConnection from '../common/reducers/connection';

export default (socket) => {
  const connection = StatefulSocketConnection(socket, reducer);
  const state = () => connection.getState();

  connection.getUser = () => fromConnection.getUser(state());
  connection.isAuth = () => fromConnection.getAuth(state());
  connection.getUsername = () => fromConnection.getUsername(state());

  return connection;
};