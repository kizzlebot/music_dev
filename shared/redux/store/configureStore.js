import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../../containers/DevTools/DevTools';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

export default function configureStore(initialState = {}) {
  let finalCreateStore;

  if (process.env.CLIENT) {
    const logger = createLogger();
    finalCreateStore = compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  }
  else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod.js');
// } else {
//   module.exports = require('./configureStore.dev.js');
// }
