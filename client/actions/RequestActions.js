import {
  SOCKET_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_SEND,
  SEND,
  GAME_START,
  GAME_WATCH,
  GAME_JOIN,
  GAME_MOVE,
  GAME_RESTART
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

export const startGame = (game) => ({
  type: GAME_START,
  SOCKET_REQUEST,
  game
})

export const watchGame = (id) => ({
  type: GAME_WATCH,
  SOCKET_REQUEST,
  id
})

export const joinGame = (id, player) => ({
  type: GAME_JOIN,
  SOCKET_REQUEST,
  id,
  player
})

export const moveGame = (id, move) => ({
  type: GAME_MOVE,
  SOCKET_REQUEST,
  id,
  move
})

export const restartGame = (id) => ({
  type: GAME_RESTART,
  SOCKET_REQUEST,
  id
})