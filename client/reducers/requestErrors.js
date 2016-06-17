import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
 } from '../../common/constants/SocketEvents';

const initialState = {
  login: ''
}

export default function participants(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
      return { ...state, login: '' };

    case LOGIN_FAILURE:
      return { ...state, login: payload };

    default:
      return state;
  }
}