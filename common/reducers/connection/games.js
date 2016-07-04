import {
  WATCH_GAME,
  DISCONNECT
} from '../../constants'

const games = (state = [], action) => {
  switch (action.type) {
    case WATCH_GAME:
      if (state.indexOf(action.id) === -1) {
        return [ ...state, action.id ];
      }
      return state;

    case DISCONNECT:
      return [];

    default:
      return state;
  }
}

export default games