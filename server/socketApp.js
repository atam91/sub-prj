const { SocketApp } = require('../common/lib/SocketApp');
const { serverService, Connection } = require('../common/SocketAppDefine');

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});
  
  return SocketApp(io, Connection, serverService);
};