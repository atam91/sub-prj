import {
  MESSAGE_SEND
} from '../../common/constants/ApiEvents';

export function messageSend(message) {
  return {
    type: MESSAGE_SEND,
    payload: message
  };
}