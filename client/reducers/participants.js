import { PARTICIPANTS } from '../../common/constants/ApiEvents';

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