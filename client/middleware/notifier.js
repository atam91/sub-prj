import { tick } from '../services/notifier'

import {
  MESSAGE
} from '../../common/constants/SocketEvents';


export default function(store) {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case MESSAGE:
        tick();
        break;
    }

    return result;
  };
}