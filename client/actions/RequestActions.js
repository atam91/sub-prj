import {
  LOGIN_REQUEST,
  LOGOUT_SEND,
  SEND
} from '../../common/constants';

const socket_request = true;

export const login = (name) => ({
  type: LOGIN_REQUEST,
  socket_request,
  name
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
