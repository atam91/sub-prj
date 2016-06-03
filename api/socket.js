var SocketIO = require('socket.io');

var counter = 0;

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});

  io.on('connection', function (socket) {
    socket.emit('counter', { counter: counter });
    socket.on('counter', function (data) {
      socket.emit('counter', { counter: ++counter });
    });

    socket.on('login_request', data => {
      console.log('login_request', data);
      socket.emit('login_response', {payload: data.name})
    });
  });
};