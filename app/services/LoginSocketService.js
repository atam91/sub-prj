import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants/User'

export function loginSocketMiddleware(socket, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      socket.emit('login_request', {name: action.payload});
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
}