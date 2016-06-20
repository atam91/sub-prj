import io from 'socket.io-client';
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
  if (!socket) connect();
};

const connect = () => {
  socket = io.connect(API_URL, { path: '/io' });

  socket.on(ACTION, (action) => dispatch(action));

  socket.on(STATE, (payload) => dispatch({ type: STATE, payload }));

  socket.on('disconnect', () => dispatch({ type: DISCONNECT }));

  socket.on(DISCONNECT, () => connect());
};

const requestMiddleware = (action) => {
  if (action.socket_request) {
    let cleanAction = { ...action };
    delete cleanAction.socket_request;
    
    socket.emit(REQUEST, cleanAction);
  }
};

export { setDispatch, requestMiddleware }



