import { combineReducers } from 'redux'
import {
  UNREAD,
  CHANNEL
} from '../../common/constants';

const unread = (state = [], action) => {
  switch (action.type) {
    case UNREAD:
      return [ ...state, action.channel ];

    case CHANNEL:
      return state.filter(i => i !== action.channel);

    default:
      return state;
  }
};

export default combineReducers({ unread })