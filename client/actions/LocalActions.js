import {
  WATCH_GAME,
  CHANNEL
} from '../../common/constants';

export const watchGame = (id) => ({
  type: WATCH_GAME,
  id
})

export const setChannel = (channel) => ({
  type: CHANNEL,
  channel
})