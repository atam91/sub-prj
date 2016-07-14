import { GAME_STATE } from '../../common/constants'
import { animate } from '../../common/games/kalah'
const TICK_TIME = 400;

export default (store) => next => action => {
  const result = next(action);

  switch (action.type) {
    case GAME_STATE:
      let { state } = action;

      if (state.animation.active) {
        state = animate(state);

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