import { 
  MESSAGES,
  MESSAGE_EVENT
 } from '../../common/constants/ApiEvents';

const initialState = {
  list: []
}

export default function participants(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_EVENT:
      return {...state, list: [ ...state.list, action.payload ] };

    case MESSAGES:
      return {...state, list: [ ...state.list, ...action.payload ] };

    default:
      return state;
  }
}