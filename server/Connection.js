import { StatefulSocketConnection } from '../common/lib/SocketApp';
import connectionReducer from '../common/reducers/connection';

export default (socket) => {
  const connection = StatefulSocketConnection(socket, connectionReducer);

  connection.getAuth = () => connection.getState().user.auth;
  connection.getUsername = () => connection.getState().user.name;

  return connection;
};