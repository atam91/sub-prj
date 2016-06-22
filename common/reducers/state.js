import { combineReducers } from 'redux'
import {
  STATE,
  PARTICIPANTS,
  MESSAGE,
  GAME,
  CLEAR
} from '../constants'

const participants = (state = [], action) => {
  switch (action.type) {
    case STATE:
    case PARTICIPANTS:
      return action.participants;

    default:
      return state;
  }
};

const chat = (state = [], action) => {
  switch (action.type) {
    case GAME:
    case MESSAGE:
      return [ ...state, action.payload ];

    case STATE:
      return [ ...state, ...action.chat ];

    case CLEAR:
      return [];

    default:
      return state;
  }
};

export default combineReducers({ participants, chat });