import io from 'socket.io-client';
import { objectFilterKey, notFilter } from '../../common/lib/utils'
import {
  STATE,
  ACTION,
  REQUEST,
  DISCONNECT
} from '../../common/lib/SocketApp'
import API_URL from '../constants/Api';

let dispatch;
let socket;

const setDispatch = (storeDispatch) => {
  dispatch = storeDispatch;
};

const connect = () => {
  socket && socket.disconnect();
  socket = io.connect(API_URL, { path: '/io' });

  socket.on(ACTION, (action) => dispatch(action));

  socket.on(STATE, (payload) => dispatch({ type: STATE, payload }));

  socket.on('disconnect', () => dispatch({ type: DISCONNECT }));

  socket.on(DISCONNECT, () => connect());
};

const socket_request = 'socket_request';

const requestMiddleware = (action) => {
  action[socket_request] && socket.emit(
    REQUEST,
    objectFilterKey(action, notFilter(socket_request))
  );
};

export { setDispatch, connect, requestMiddleware }



