var SocketIO = require('socket.io');

var counter = 0;

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});

  io.on('connection', function (socket) {
    socket.emit('counter', { counter: counter });
    socket.on('counter', function (data) {
      socket.emit('counter', { counter: ++counter });
    });
  });
};