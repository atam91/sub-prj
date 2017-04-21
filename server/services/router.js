const {
  SEND
} = require('../../common/constants');

const controller = require('./controller');
const chat = require('./chat');

const handler = (connection, action) => {
  switch (action.type) {
    case SEND:
      const text = action.payload;

      if (text.startsWith('/do')) {
        controller.cmd(connection, text);
      } else {
        chat.send(connection, chat.createMessage(text), action.to);
      }
      break;
  }
};

module.exports = { handler };