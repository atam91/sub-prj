import { combineReducers } from 'redux'
import {
  STATE,
  PARTICIPANTS,
  MESSAGE,
  GAME,
  GAME_DATA,
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

const messages = (state = {}, action) => {
  switch (action. type) {
    case MESSAGE:
      return { ...state, [action.id]: action.payload };

    case STATE:
      return { ...state, ...action.messages };

    case CLEAR:
      return {};

    default:
      return state;
  }
};

const games = (state = {}, action) => {
  switch (action. type) {
    case GAME:
      return { ...state, [action.id]: action.payload };

    case GAME_DATA:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          data: action.data
        }
      };

    case STATE:
      return action.games;

    case CLEAR:
      return {};

    default:
      return state;
  }
};

const game = ({ id }) => ({ id, type: 'game' });
const message = ({ id }) => ({ id, type: 'message' });

const chat = (state = [], action) => {
  switch (action.type) {
    case GAME:
      return [ ...state, game(action)];

    case MESSAGE:
      return [ ...state, message(action)];

    case STATE:
      return [ ...state, ...action.chat ];

    case CLEAR:
      return [];

    default:
      return state;
  }
};

export default combineReducers({
  participants,
  messages,
  games,
  chat
});