import { PARTICIPANTS } from '../constants/Socket';

const initialState = {
  list: []
}

export default function participants(state = initialState, action) {
  switch (action.type) {
    case PARTICIPANTS:
      return { ...state, list: action.payload };

    default:
      return state;
  }
}