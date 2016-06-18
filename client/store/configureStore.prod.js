import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import middlewares from './middlewares'
import services from './services'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  services(store);

  return store;
}