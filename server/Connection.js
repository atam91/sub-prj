module.exports = function(socket) {
  var connection = {};
  var user;

  connection.setUser = (name) => {
    user = name;
  };

  connection.getUser = () => user;

  connection.getSocket = () => socket;

  connection.emit = socket.emit.bind(socket);

  return connection;
};