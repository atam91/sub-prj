import { combineReducers } from 'redux'
import { STATE } from '../lib/SocketApp'
import {
  PARTICIPANTS,
  MESSAGE,
  CLEAR
} from '../constants/SocketEvents'

const participants = (state = [], action) => {
  switch (action.type) {
    case PARTICIPANTS:
      return action.payload;

    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case MESSAGE:
      return [ ...state, action.payload ];

    case CLEAR:
      return [];

    default:
      return state;
  }
};

const stateReducer = combineReducers({ participants, messages });

export default (state, action) => {
  switch (action.type) {
    case STATE:
      return action.payload;

    default:
      return stateReducer(state, action);
  }
}