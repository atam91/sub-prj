import io from 'socket.io-client';
import { objectFilterKey, notFilter } from '../../common/utils';

import API_URL from '../constants/API_URL';
import {
  STATE,
  ACTION,
  REQUEST,
  DISCONNECT,
  SOCKET_REQUEST
} from '../../common/constants';

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

const requestListener = (action) => {
  action[SOCKET_REQUEST] && socket.emit(
    REQUEST,
    objectFilterKey(action, notFilter(SOCKET_REQUEST))
  );
};

export { setDispatch, connect, requestListener }