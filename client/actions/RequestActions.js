import {
  LOGIN_REQUEST,
  LOGOUT_SEND,
  SEND
} from '../../common/constants/SocketEvents';

const socket_request = true;

export const login = (payload) => ({
  type: LOGIN_REQUEST,
  socket_request,
  payload
})

export const logout = () => ({
  type: LOGOUT_SEND,
  socket_request
})

export const send = (payload) => ({
  type: SEND,
  socket_request,
  payload
})
