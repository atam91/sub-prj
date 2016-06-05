import {
  LOGIN_REQUEST,
  LOGOUT_SEND
} from '../../common/constants/ApiEvents';

export function loginRequest(username) {
  return {
    type: LOGIN_REQUEST,
    payload: username
  };
}

export function logoutSend() {
  return {
    type: LOGOUT_SEND
  };
}