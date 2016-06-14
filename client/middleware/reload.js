import { DISCONNECT } from '../../common/lib/SocketApp'
import { RELOAD } from '../../common/constants/SocketEvents'

export default function() {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case RELOAD:
      case DISCONNECT:
        window.location.reload(false);
    }

    return result;
  };
}