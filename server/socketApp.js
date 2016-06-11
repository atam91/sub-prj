const SocketIO = require('socket.io');
const { SocketApp } = require('../common/lib/SocketApp');

const stateReducer = require('../common/reducers/state');
const services = require('./services');
const requestServices = require('./requestServices');
const Connection = require('./Connection');

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});
  
  return new SocketApp(
    io,
    stateReducer,
    requestServices,
    services,
    Connection
  );
};