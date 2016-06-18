import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
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
      createLogger(),
      socketMiddleware,
      notifierMiddleware,
      reloadMiddleware
    )
  );

  startSocketService(store);

  if ((process.env.NODE_ENV == 'development') && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}