import io from 'socket.io-client';
import API_URL from '../constants/Api';



import loginSocketService, { loginSocketMiddleware } from '../services/LoginSocketService'
import chatSocketService, { chatSocketMiddleware } from '../services/ChatSocketService'

var socket = io.connect(API_URL, { path: '/io' });;

export default function startSocketService(store) {
  clientSocketService(socket, store.dispatch);

  loginSocketService(socket, store.dispatch);
  chatSocketService(socket, store.dispatch);
}

export default function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    clientSocketMiddleware(socket, action);

    loginSocketMiddleware(socket, action);
    chatSocketMiddleware(socket, action);

    return result;
  };
}

