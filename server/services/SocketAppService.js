const {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  PARTICIPANTS
} = require('../../common/constants/ApiEvents');

module.exports = function(io) {
  var service = {};

  var users = {};

  const participants = function(socket) {
    (socket || io).emit(PARTICIPANTS, {payload: Object.keys(users)});
  };

  const logout = function(socket) {
    if (socket.user) {
      delete users[socket.user];
      participants();
    }
  };

  io.on('connection', function (socket) {
    participants(socket);

    socket.on(LOGIN_REQUEST, data => {
      const name = data.payload;

      if (name in users) {
        socket.emit(LOGIN_RESPONSE, {error: 'Имя уже используется'})
      } else {
        users[name] = socket;
        socket.user = name;
        socket.emit(LOGIN_RESPONSE, {payload: name, success: true});
        participants();

        socket.on(LOGOUT_REQUEST, data => {
          logout(socket);
          socket.emit(LOGOUT_RESPONSE, {success: true});
        });
      }
    });

    socket.on('disconnect', data => {
      logout(socket);
    });
  });

  return service;
};