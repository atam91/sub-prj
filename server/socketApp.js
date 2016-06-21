const console = require('./lib/console')('socketApp', 'green');
const bold = console.bold;
import SocketIO from 'socket.io';
import { SocketApp } from './lib/SocketApp';
import { PARTICIPANTS } from '../common/constants';
import stateReducer from '../common/reducers/state';
import services from './services';
import Connection from './Connection';

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});

  const logger = (action) => {
    switch (action.type) {
      case PARTICIPANTS:
        console.log(PARTICIPANTS, bold(action.participants));
    }
  };
  
  const socketApp = new SocketApp(
    io,
    Connection,
    services,
    stateReducer,
    logger
  );

  return socketApp;
};