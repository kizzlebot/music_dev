import path from 'path';

// Expressjs configurer
import middlewareConfigurer from './config/middleware.config';

// React.js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';


// Redux
import configureStore  from '../shared/redux/store/configureStore';

import { Provider } from 'react-redux';




// required react modules
var routes = require('../shared/routes').default;
import { fetchComponentData } from './util/fetchData';
import renderFullPage, { renderError } from './util/renderFullPage';

import api from './routes';
import serverConfig from './config';


/* -------------------------------------------------------------------------------------- */
/* ----------------------------------- END IMPORTS -------------------------------------- */
/* -------------------------------------------------------------------------------------- */





/* -------------------------------------------------------------------------------------- */
/* -------------------------------- SETUP MIDDLEWARE -------------------------------------*/
/* -------------------------------------------------------------------------------------- */
middlewareConfigurer((app) => {

  app.use('/api', api);

  // --------------------------------------------------------------------
  // Server Side Rendering based on routes matched by React-router.
  // --------------------------------------------------------------------

  app.use((req, res, next) => {

    // React-router match requested path with a react-router route
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err)              return res.status(500).end(renderError(err));
      if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      if (!renderProps)     return next();



      const initialState = {
        // TODO: rename posts field to entries
        "post": {
          "posts": [],
          "post": {}
        },
        "auth": {
          "token": null,
          "username": "",
          "isAuthenticated": false,
          "isAuthenticating": false,
          "statusText": ""
        },
        // TODO: Use 'data' key or get rid of
        "data": {
          "data": null,
          "isFetching": false
        },
        "soundcloud": {
          "oauth_token": null,
          "shouldShowStream": false,
          "collection": [],
          "next_href": null,
          "page":0,
          "fetch_success":false,
          "isFetching":false
        },
        "spotify": {
          "oauth_token": null,
          "current": {
            artist:null,
            album: null,
            track:null
          },
          "search": {
            query: null,
            type: 'artist',
            tracks: [],
            artists: [],
            albums: []
          }
        }
      }


      // create Redux Store
      const store = configureStore(initialState);


      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          const finalState = store.getState();
          const html = renderFullPage(initialView, finalState);

          res.status(200).end(html);
        })
        .catch(err => res.status(500).end(renderError(err)));
    });
  });
























/* -------------------------------------------------------------------------------------- */
/* ----------------------------- Start/Export Server -------------------------------------*/
/* -------------------------------------------------------------------------------------- */
if (process.env.NODE_ENV != 'test') {
 app.listen(serverConfig.port, (error) => {
   if (!error) console.log(`musicDev is running on port: ${serverConfig.port}! Build something amazing!`);
 });
}


  module.exports.default = app;
});
