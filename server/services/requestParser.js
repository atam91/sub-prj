const {
  SEND
} = require('../../common/constants/SocketEvents');

module.exports = function(socketApp) {
  var index = 1;

  const handlers = {
    SEND:
      (connection) => (text) => {
        if (text.startsWith('/do')) {
          socketApp.services.controller.cmd(connection, text);
        } else {
          socketApp.services.chat.sendMessage(connection, text);
        }
      }
  };

  return { handlers };
}