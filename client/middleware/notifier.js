import { tick } from '../services/notifier'

import {
  MESSAGE_EVENT
} from '../../common/constants/SocketEvents';


export default function(store) {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case MESSAGE_EVENT:
        tick();
        break;
    }

    return result;
  };
}