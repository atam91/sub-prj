var SocketIO = require('socket.io');
var LoginApp = require('./LoginApp');
const Connection = require('./Connection');

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});
  const loginApp = LoginApp(io);

  io.on('connection', (socket) => {
    var connection = Connection(socket);

    loginApp.connect(connection);

    socket.on('disconnect', data => {
      loginApp.disconnect(connection);
      delete connection;
    });
  });
};