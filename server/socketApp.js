import SocketIO from 'socket.io'
import { SocketApp } from '../common/lib/SocketApp'
import stateReducer from '../common/reducers/state'
import services from './services';
import Connection from './Connection'

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});
  
  return new SocketApp(
    io,
    stateReducer,
    services,
    Connection
  );
};