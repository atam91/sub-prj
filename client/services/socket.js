import io from 'socket.io-client';
import { client } from '../../common/lib/SocketApp'

import API_URL from '../constants/Api';
import clientDescription from '../../common/clientDescription';

const {
  socketService,
  socketRequestMiddleware
} = client(clientDescription);

const socket = io.connect(API_URL, { path: '/io' });

const start = (dispatch) => socketService(socket, dispatch);
const requestMiddleware = (action) => socketRequestMiddleware(socket, action);

export { start, requestMiddleware }