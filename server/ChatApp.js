const {
  MESSAGES,
  MESSAGE_SEND,
  MESSAGE_EVENT
} = require('../common/constants/ApiEvents');
const { describeSocketRequest } = require('./socketUtils');

var io;
var id = 1;
var messages = [];

const message = (connection) => (data) => {
  const message = {
    id: id++,
    name: connection.getUser(),
    text: data.payload
  };

  io.emit(MESSAGE_EVENT, {payload: message});
  messages.push(message);
};

const sendMessages = (connection) => {
  connection.emit(MESSAGES, {payload: messages});
};

module.exports = function(socketIO) {
  var service = {};
  io = socketIO;

  service.connect = (connection) => {
    sendMessages(connection);
    
    describeSocketRequest(connection)
      (MESSAGE_SEND, null, message(connection));
  };

  return service;
};