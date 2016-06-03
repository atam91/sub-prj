import io from 'socket.io-client';
import API_URL from '../constants/Api';
import loginSocketService, {loginSocketMiddleware} from '../services/LoginSocketService'

var socket = null;

export function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    loginSocketMiddleware(socket, action);

    return result;
  };
}

export default function startSocket(store) {
  socket = io.connect(API_URL, { path: '/io' });

  loginSocketService(socket, store.dispatch);
}