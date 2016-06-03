import { LOGIN_REQUEST } from '../constants/User';

export function loginRequest(username) {
  return {
    type: LOGIN_REQUEST,
    payload: username
  };
}