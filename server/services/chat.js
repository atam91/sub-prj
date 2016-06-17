const {
  MESSAGE
} = require('../../common/constants/SocketEvents');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

let index = 1;

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