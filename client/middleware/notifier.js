import { tick } from '../services/notifier'
import connection, * as fromConnection from '../../common/reducers/connection'

import {
  MESSAGE,
  GAME_STATE
} from '../../common/constants';


export default (store) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case MESSAGE:
      tick();
      break;

    case GAME_STATE:
      const username = fromConnection.getUsername(store.getState().connection);
      if (action.state.players[action.state.moves].name === username) {
        tick();
      }
      break;
  }

  return result;
}