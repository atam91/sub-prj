const SocketIO = require('socket.io');
const { SocketApp } = require('../common/lib/SocketApp');

const stateReducer = require('../common/reducers/state');
const serverServices = require('../common/serverServices');
const ServerConnection = require('../common/ServerConnection');

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});
  
  return new SocketApp(io, stateReducer, serverServices, ServerConnection);
};