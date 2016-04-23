/*eslint-disable */
import React from 'react';
import routes from '../shared/routes';
import DevTools from '../shared/container/DevTools/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from '../shared/redux/store/configureStore';
import Actions from '../shared/redux/actions';
import Reducers from '../shared/redux/reducers';
import jwtDecode from 'jwt-decode';
import SC from 'soundcloud';



// CSS style requirements
require('bootstrap-webpack!./bootstrap.config.js');
require('font-awesome-webpack');
require('animate.css');
require('./keen.css');
require('./app.css');

// React+Redux
const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;
const dest = document.getElementById('root');


// Render React components on `dest`
render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), dest);



// If non-production environment, enable stuff for debugging purposes
if (process.env.NODE_ENV !== 'production') {
  window.React = React;           // enable debugger

  // Redux modules
  window.store = store ;
  window.Actions = Actions;
  window.reducers = Reducers;

  // Misc
  window.jwt = jwtDecode;
  window.SC = SC;


  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line
  }


}






if (process.env.CLIENT && !window.devToolsExtension) {
  const devToolsDest = document.createElement('div');

  dest.parentNode.insertBefore(devToolsDest, dest.nextSibling);
  render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    devToolsDest
  );

}
