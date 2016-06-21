import { combineReducers } from 'redux'
import { STATE } from '../lib/SocketApp'
import {
  PARTICIPANTS,
  MESSAGE,
  CLEAR
} from '../constants/SocketEvents'

const participants = (state = [], action) => {
  switch (action.type) {
    case STATE:
    case PARTICIPANTS:
      return action.participants;

    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case MESSAGE:
      return [ ...state, action.payload ];

    case STATE:
      return [ ...state, ...action.messages ];

    case CLEAR:
      return [];

    default:
      return state;
  }
};

export default combineReducers({ participants, messages });

export const getMessages = ({ messages }) => messages;