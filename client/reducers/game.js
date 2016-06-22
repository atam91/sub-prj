import { 
  GAME_STATE
} from '../../common/constants';

export default function game(state = {}, action) {
  switch (action.type) {
    case GAME_STATE:
      return { ...state, [action.id]: action.state };

    default:
      return state;
  }
}