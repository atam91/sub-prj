import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../../common/constants/ApiEvents';

export function loginRequest(username) {
  return {
    type: LOGIN_REQUEST,
    payload: username
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}