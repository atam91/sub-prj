import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants/User';

const initialState = {
  name: null,
  error: null,
  loading: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loading: true};

    case LOGIN_SUCCESS:
      return {...state, name: action.payload, error: null, loading: false};

    case LOGIN_FAILURE:
      return {...state, name: null, error:action.payload, loading: false};

    default:
      return state;
  }
}