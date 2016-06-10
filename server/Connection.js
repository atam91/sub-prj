const { StatefulSocketConnection } = require('../common/lib/SocketApp');
const connectionReducer = require('../common/reducers/connection');

module.exports = function(socket) {
  const connection = StatefulSocketConnection(socket, connectionReducer);

  connection.getAuth = () => connection.getState().user.auth;
  connection.getUsername = () => connection.getState().user.name;

  return connection;
};