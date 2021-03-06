/*eslint-disable */
import React from 'react';
import routes from '../shared/routes';
import DevTools from '../shared/containers/DevTools/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from '../shared/redux/store';
import Actions from '../shared/redux/actions';
import Reducers from '../shared/redux/reducers';
import jwtDecode from 'jwt-decode';
import SC from 'soundcloud';

// var spotify = require('spotify')
var spotify = require('../shared/redux/Spotify');


// CSS style requirements
require('bootstrap-webpack!./bootstrap.config.js');
require('font-awesome-webpack');
require('animate.css');
require('./spotify.scss');
require('bootstrap-social/bootstrap-social.css');

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
  window.React = React;                         // enables debugger





  /* For debugging purposes */

  // Misc
  window.jwt = jwtDecode;
  window.spotify = spotify ;
  window.SC = SC;

  // Redux modules
  window.store = store ;
  window.actions = Actions;
  window.reducers = Reducers;



  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line
  }

  if (!window.devToolsExtension) {
    const devToolsDest = document.createElement('div');

    dest.parentNode.insertBefore(devToolsDest, dest.nextSibling);
    render(
      <Provider store={store} key="provider">
        <DevTools />
      </Provider>,
      devToolsDest
    );
  }
}
