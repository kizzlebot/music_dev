import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../container/DevTools/DevTools';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';


export function configureStore(initialState = {}) {
  let enhancerClient;
  if (process.env.CLIENT) {
    const logger = createLogger();
    enhancerClient = compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    );
  }


  const enhancerServer = applyMiddleware(thunk);

  let store;

  if (process.env.CLIENT) {
    store = createStore(rootReducer, initialState, enhancerClient);
  } else {
    store = createStore(rootReducer, initialState, enhancerServer);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
