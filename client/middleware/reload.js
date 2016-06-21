import { RELOAD } from '../../common/constants'

export default () => next => action => {
  const result = next(action);

  switch (action.type) {
    case RELOAD:
      window.location.reload(false);
  }

  return result;
}