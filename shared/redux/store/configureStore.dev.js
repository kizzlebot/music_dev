import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../containers/DevTools/DevTools';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';


export default function configureStore(initialState = {}) {
  let enhancerClient;
  if (process.env.CLIENT) {
    const logger = createLogger();
    enhancerClient = compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    );
  }


  const enhancerServer = applyMiddleware(thunk);
  let store = createStore(rootReducer, initialState, (process.env.CLIENT) ? enhancerClient : enhancerServer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(['../reducers'], () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
