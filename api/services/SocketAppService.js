module.exports = function(io) {
  var service = {};

  var users = {};

  const participants = function(socket) {
    (socket || io).emit('participants', {payload: Object.keys(users)});
  };

  const logout = function(socket) {
    if (socket.user) {
      delete users[socket.user];
      participants();
    }
  };

  io.on('connection', function (socket) {
    participants(socket);

    socket.on('login_request', data => {
      const name = data.payload;

      if (name in users) {
        socket.emit('login_response', {error: 'Имя уже используется'})
      } else {
        users[name] = socket;
        socket.user = name;
        socket.emit('login_response', {payload: name, success: true});
        participants();

        socket.on('logout_request', data => {
          logout(socket);
          socket.emit('logout_response', {success: true});
        });
      }
    });

    socket.on('disconnect', data => {
      logout(socket);
    });
  });

  return service;
};