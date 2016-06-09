const { StatefulSocketConnection } = require('./lib/SocketApp');
const connectionReducer = require('./reducers/connection');

module.exports = function(socket) {
  const connection = StatefulSocketConnection(socket, connectionReducer);

  connection.getAuth = () => connection.getState().user.auth;
  connection.getUsername = () => connection.getState().user.name;

  return connection;
};