import io from 'socket.io-client';
import { client } from '../../common/lib/SocketApp'

import API_URL from '../constants/Api';
import { clientDescription } from '../../common/AppDefine';

const {
  socketService,
  socketRequestMiddleware
} = client(clientDescription());

const socket = io.connect(API_URL, { path: '/io' });

export function startSocketService(store) {
  socketService(socket, store.dispatch);
}

export default function() {
  console.log('soc mid');
  return next => action => {
    const result = next(action);

    console.log('mid:', action.type);
    socketRequestMiddleware(socket, action);

    return result;
  };
}