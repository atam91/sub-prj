import {
  WATCH_GAME
} from '../../common/constants';

export const watchGame = (id) => ({
  type: WATCH_GAME,
  id
})