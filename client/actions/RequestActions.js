import {
  SOCKET_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_SEND,
  SEND
} from '../../common/constants';

export const login = (name) => ({
  type: LOGIN_REQUEST,
  SOCKET_REQUEST,
  name
})

export const logout = () => ({
  type: LOGOUT_SEND,
  SOCKET_REQUEST
})

export const send = (payload) => ({
  type: SEND,
  SOCKET_REQUEST,
  payload
})
