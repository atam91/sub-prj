var SocketIO = require('socket.io');
var SocketAppService = require('./services/SocketAppService');


module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});

  SocketAppService(io);
};