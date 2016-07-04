import {
  STATE,
  CLEAR,
  GET,
  GET_DATA,
  MESSAGE,
  MAIN
} from '../../constants'

const getByType = (objects, type) => (
  Object.keys(objects)
    .filter(key => objects[key].type === type)
    .reduce((prev, key) => ({ ...prev, [key]: objects[key] }), {})
);

const initialChat = {
  objects: {},
  channels: {
    [MAIN]: []
  }
};

const chat = (state = initialChat, action) => {
  switch (action. type) {
    case GET:
      return {
        objects: {
          ...state.objects,
          [action.id]: action.payload
        },
        channels: {
          ...state.channels,
          [action.to]: [ ...(state.channels[action.to] || {}), action.id ]
        }
      };

    case GET_DATA:
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.id]: {
            ...state.objects[action.id],
            data: action.data
          }
        }
      };
      
    case STATE:
      return {
        objects: {
          ...getByType(state.objects, MESSAGE),
          ...action.chat.objects
        },
        channels: {
          ...state.channels,
          [MAIN]: [ ...state.channels[MAIN], ...action.chat.channels[MAIN] ]
        }
      };

    case CLEAR:
      return initialChat;

    default:
      return state;
  }
};

export default chat