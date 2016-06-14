const {
  MESSAGE
} = require('../../common/constants/SocketEvents');

var socketApp;
const setSocketApp = (app) => { socketApp = app; };

var index = 1;

const sendMessage = (connection, text) => {
  socketApp.dispatch(MESSAGE, {
    id: index++,
    name: connection.getUsername(),
    text
  });
};

module.exports = {
  setSocketApp,
  sendMessage
};