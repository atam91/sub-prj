import {
  STATE,
  PARTICIPANTS
} from '../../constants'

const users = (state = [], action) => {
  switch (action.type) {
    case STATE:
    case PARTICIPANTS:
      return action.users;

    default:
      return state;
  }
};

export default users;