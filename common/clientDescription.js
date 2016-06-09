const { STATE } = require('./lib/SocketApp');
const { action } = require('./lib/utils');

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS,
  MESSAGE_SEND,
  MESSAGE_EVENT
} = require('./constants/SocketEvents');


module.exports = function() {
  const requests = {
    login:
      (p) => action(LOGIN_REQUEST, p),

    logout:
      () => action(LOGOUT_SEND),

    message:
      (p) => action(MESSAGE_SEND, p)
  };

  const listens = [
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_EVENT,
    PARTICIPANTS,
    MESSAGE_EVENT,
    STATE
  ];

  const disconnectAction = LOGOUT_EVENT;

  return { requests, listens, disconnectAction };
}