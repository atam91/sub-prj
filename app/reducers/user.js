import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../constants/User';

const initialState = {
  name: null,
  error: null
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, error: null}

    case LOGIN_SUCCESS:
      return {...state, name: action.payload};

    case LOGIN_FAILURE:
      return {...state, name: null, error: action.payload};

    case LOGOUT_SUCCESS:
      return {...state, name: null, error: null};

    default:
      return state;
  }
}