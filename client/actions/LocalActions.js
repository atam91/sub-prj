import {
  WATCH_GAME,
  CHANNEL,
  UNREAD
} from '../../common/constants';

export const watchGame = (id) => ({
  type: WATCH_GAME,
  id
})

export const setChannel = (channel) => ({
  type: CHANNEL,
  channel
})

export const markUnread = (channel) => ({
  type: UNREAD,
  channel
})