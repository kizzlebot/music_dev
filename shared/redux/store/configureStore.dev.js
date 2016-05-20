import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../containers/DevTools/DevTools';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';


export default function configureStore(initialState = {}) {
  let enhancerClient;
  let enhancer ;
  if (process.env.CLIENT) {
    const logger = createLogger();
    enhancer = compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    );
  }
  else enhancer = applyMiddleware(thunk);

  let store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(['../reducers', '../constants', '../actions'], () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
