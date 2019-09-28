import { GAME_STATE } from '../../common/constants'
import { animate } from '../../common/games/kalah'     //// FIXME   gc!!!!
const TICK_TIME = 400;          //// todo to strategy tooo!!!

export default (store) => next => action => {
  const result = next(action);

  switch (action.type) {
    case GAME_STATE:
      let { state } = action;
      if (!state.animation) break;

      if (state.animation.active) {
        state = animate(state);                         //// FIXME   gc!!!!

        setTimeout(() => {
          store.dispatch({ ...action, state });
        }, TICK_TIME);
      } else if (state.animation.afterState) {
        setTimeout(() => {
          store.dispatch({
            ...action,
            state: state.animation.afterState
          });
        }, TICK_TIME);
      }
      break;
  }

  return result;
}