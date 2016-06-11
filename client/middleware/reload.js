import { RELOAD } from '../../common/constants/SocketEvents'

export default function() {
  return next => action => {
    const result = next(action);

    switch (action.type) {
      case RELOAD:
        window.location.reload(false);
    }

    return result;
  };
}