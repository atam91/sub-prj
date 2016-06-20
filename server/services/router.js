const {
  SEND
} = require('../../common/constants/SocketEvents');

const controller = require('./controller');
const chat = require('./chat');

const handler = (connection, action) => {
  switch (action.type) {
    case SEND:
      const text = action.payload;

      text.startsWith('/do') ?
        controller.cmd(connection, text) :
        chat.sendMessage(connection, text);
      break;
  }
};

module.exports = { handler };