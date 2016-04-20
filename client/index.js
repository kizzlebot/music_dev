/*eslint-disable */

require('bootstrap-webpack!./bootstrap.config.js');
require('animate.css');
require('./keen.css');
require('font-awesome-webpack');


var Holder = window.Holder = require('holderjs');


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

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;
const dest = document.getElementById('root');

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line
  }
}



window.store = store ;
window.Actions = Actions;
window.reducers = Reducers;
window.jwt = jwtDecode;
window.SC = SC;


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
