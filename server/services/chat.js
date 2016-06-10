const {
  MESSAGE_SEND,
  MESSAGE_EVENT
} = require('../../common/constants/SocketEvents');

module.exports = function(socketApp) {
  var index = 1;

  const handlers = {
    MESSAGE_SEND:
      (connection) => (text) => {
        socketApp.dispatch(MESSAGE_EVENT, {
          id: index++,
          name: connection.getUsername(),
          text
        });
      }
  };

  return { handlers };
}