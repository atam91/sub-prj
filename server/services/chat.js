const {
  MESSAGE
} = require('../../common/constants/SocketEvents');

module.exports = function(socketApp) {
  var index = 1;

  const sendMessage = (connection, text) => {
    socketApp.dispatch(MESSAGE, {
      id: index++,
      name: connection.getUsername(),
      text
    });
  };

  const handlers = {};

  return { handlers, sendMessage };
}