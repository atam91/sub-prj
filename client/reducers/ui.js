import { combineReducers } from 'redux'
import {
  CHANNEL,
  MAIN,
  WATCH_GAME,
  DISCONNECT
} from '../../common/constants';

const currentChannel = (state = MAIN, action) => {
  switch (action.type) {
    case CHANNEL:
      return action.channel;

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