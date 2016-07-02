import {
  WATCH_GAME,
  DISCONNECT,
  LOGOUT_EVENT
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

export const currentGame = (state = null, action) => {
  switch (action.type) {
    case WATCH_GAME:
      return action.id;

    case DISCONNECT:
      return null;

    default:
      return state;
  }
};

export default games