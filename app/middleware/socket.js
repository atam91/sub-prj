import io from 'socket.io-client';
import API_URL from '../constants/Api';
import { 
  GET_PHOTOS_REQUEST, 
  GET_PHOTOS_SUCCESS 
} from '../constants/Page'

var socket = null;

export function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case GET_PHOTOS_REQUEST:
        socket.emit('counter');
        break;
    }

    return result;
  };
}

export default function(store) {
  socket = io.connect(API_URL, { path: '/io' });

  socket.on('counter', data => {
    console.log('counter=', data.counter);

    store.dispatch({
      type: GET_PHOTOS_SUCCESS,
      payload: data.counter
    });
  });
}