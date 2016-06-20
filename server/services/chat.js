const {
  MESSAGE
} = require('../../common/constants/SocketEvents');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

let index = 1;

const message = (name, text) => ({
  id: index++,
  name,
  text
});

const sendMessage = (connection, text) => {
  //abc.def();
  socketApp.dispatch({
    type: MESSAGE,
    payload: message(connection.getUsername(), text)
  });
};

module.exports = {
  setSocketApp,
  sendMessage
};