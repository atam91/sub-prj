import { combineReducers } from 'redux'
import {
  GET,
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

const channels = (state = [], action) => {
  switch (action.type) {
    case GET:
      if (state.indexOf(action.to) === -1) {
        return [ ...state, action.to ];
      }
      return state;

    default:
      return state;
  }
};

export default combineReducers({ unread, channels })