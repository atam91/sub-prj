const console = require('./lib/console')('socketApp', 'green');
const bold = console.bold;
import SocketIO from 'socket.io';
import { SocketApp } from './lib/SocketApp';
import { PARTICIPANTS } from '../common/constants';
import reducer from '../common/reducers/common';
import services from './services';
import Connection from './Connection';

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});

  const logger = (action) => {
    switch (action.type) {
      case PARTICIPANTS:
        console.log(PARTICIPANTS, bold(action.users));
    }
  };
  
  const socketApp = new SocketApp(
    io,
    Connection,
    services,
    reducer,
    logger
  );

  return socketApp;
};