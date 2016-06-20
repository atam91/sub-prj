const { STATE, DISCONNECT } = require('./lib/SocketApp');
const { action } = require('./lib/utils');
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS,
  SEND,
  MESSAGE,
  CLEAR,
  RELOAD
} = require('./constants/SocketEvents');

const requests = {
  login:
    (p) => action(LOGIN_REQUEST, p),

  logout:
    () => action(LOGOUT_SEND),

  send:
    (p) => action(SEND, p)
};

const disconnectAction = LOGOUT_EVENT;

module.exports = { requests, disconnectAction };