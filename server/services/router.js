const { forEachKey } = require('../../common/lib/utils');

const {
  SEND
} = require('../../common/constants/SocketEvents');

const controller = require('./controller');
const chat = require('./chat');

const handlers = {
  SEND:
    (connection) => (text) => {
      if (text.startsWith('/do')) {
        controller.cmd(connection, text);
      } else {
        chat.sendMessage(connection, text);
      }
    }
};

const connect = (connection) => {
  forEachKey(handlers, connection.handleRequest);
};

module.exports = { connect };