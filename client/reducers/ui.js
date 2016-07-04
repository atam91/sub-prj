import { combineReducers } from 'redux'
import {
  PARTICIPANTS,
  CHANNEL,
  MAIN,
  WATCH_GAME,
  DISCONNECT
} from '../../common/constants';

const currentChannel = (state = MAIN, action) => {
  switch (action.type) {
    case CHANNEL:
      return action.channel;

    case PARTICIPANTS:
      if (state !== MAIN && action.users.indexOf(state) === -1) {
        return MAIN;
      }
      return state;

    default:
      return state;
  }
};

const currentGame = (state = null, action) => {
  switch (action.type) {
    case WATCH_GAME:
      return action.id;

    case DISCONNECT:
      return null;

    default:
      return state;
  }
};

export default combineReducers({ currentChannel, currentGame })