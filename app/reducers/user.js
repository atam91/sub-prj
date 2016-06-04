import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../constants/User';

const initialState = {
  auth: false,
  name: '',
  error: ''
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, error: '' }

    case LOGIN_SUCCESS:
      return { ...state, name: action.payload, auth: true };

    case LOGIN_FAILURE:
      return { ...state, name: '', error: action.payload, auth: false };

    case LOGOUT_SUCCESS:
      return { ...state, name: '', error: '', auth: false };

    default:
      return state;
  }
}