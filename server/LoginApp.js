const {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS
} = require('../common/constants/ApiEvents');
const { describeSocketRequest } = require('./socketUtils');

var io;
var users = {};

const participants = (connection) => {
  (connection || io).emit(PARTICIPANTS, {payload: Object.keys(users)});
};

const login = (connection) => (data, success, error) => {
  const name = data.payload;

  if (name in users) {
    error('Имя уже используется');
  } else {
    users[name] = connection;
    connection.setUser(name);
    success(name);
    participants();
  }
};

const logout = (connection) => (data, success) => {
  const name = connection.getUser();
  connection.setUser(null);

  if (name) {
    delete users[name];
    if (success) success();
    participants();
  }
};

module.exports = function(socketIO) {
  var service = {};
  io = socketIO;

  service.connect = (connection) => {
    participants(connection);
    
    describeSocketRequest(connection)
      (LOGIN_REQUEST, LOGIN_RESPONSE, login(connection));

    describeSocketRequest(connection)
      (LOGOUT_SEND, LOGOUT_EVENT, logout(connection));
  };

  service.disconnect = (connection) => {
    logout(connection)();
  };

  return service;
};