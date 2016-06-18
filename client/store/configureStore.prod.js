import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import socketMiddleware, { startSocketService } from '../middleware/socket'
import notifierMiddleware from '../middleware/notifier'
import reloadMiddleware from '../middleware/reload'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(
      thunk,
      socketMiddleware,
      notifierMiddleware,
      reloadMiddleware
    )
  );

  startSocketService(store);

  return store;
}