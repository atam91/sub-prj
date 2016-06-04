import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../constants/User'
import { PARTICIPANTS } from '../constants/Socket'

export function loginSocketMiddleware(socket, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      socket.emit('login_request', {name: action.payload});
      break;

    case LOGOUT_REQUEST:
      socket.emit('logout_request');
      break;
  }
}

export default function socketService(socket, dispatch) {
  socket.on('login_response', data => {
    if (data.error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: data.error
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.payload
      });
    }
  });

  socket.on('logout_response', data => {
    if (data.success) {
      dispatch({ type: LOGOUT_SUCCESS });
    }
  });

  socket.on('disconnect', () => {
    dispatch({ type: LOGOUT_SUCCESS });
  });

  socket.on('participants', data => {
    dispatch({
      type: PARTICIPANTS,
      payload: data.payload
    });
  });
}