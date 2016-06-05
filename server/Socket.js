var SocketIO = require('socket.io');
var LoginApp = require('./LoginApp');
var ChatApp = require('./ChatApp');
const Connection = require('./Connection');

module.exports = function(server) {
  const io = SocketIO(server, {path: '/io'});
  const loginApp = LoginApp(io);
  const chatApp = ChatApp(io);

  io.on('connection', (socket) => {
    var connection = Connection(socket);

    loginApp.connect(connection);
    chatApp.connect(connection);

    socket.on('disconnect', data => {
      loginApp.disconnect(connection);
      delete connection;
    });
  });
};