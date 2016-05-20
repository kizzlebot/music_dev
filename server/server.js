import path from 'path';

// Expressjs configurer
import middlewareConfigurer from './config/middleware.config';

// React.js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';


// Redux
import configureStore  from '../shared/redux/store';
import { Provider } from 'react-redux';




// required react modules
import routes from '../shared/routes';
import fetchComponentData from './util/fetchComponentData';
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


      var initialState = {
        "auth": { "token": null, "username": "", "isAuthenticated": false, "isAuthenticating": false, "statusText": "" },
        "data": { "data": null, "isFetching": false },
        "post": { "posts": [], "post": {} },
        "soundcloud": { "oauth_token": null, "shouldShowStream": false, "collection": [], "next_href": null, "page": 0 },
        "spotify": {
          "oauth_token": null,
          "current": {
            "artist": {
              "external_urls": { "spotify": "" },
              "followers": { "href": null, "total": 0 },
              "genres": [], "images": [], "error": { },
              "href": "", "id": "", "name": "", "popularity": 7, "type": "", "uri": ""
            },
            "album": null, "track": null, "type": "artist"
          },
          "search": {
            "query": null, "type": "artist", "tracks": [], "artists": [], "albums": []
          }
        }
      }


      // create Redux Store with initial state
      const store = configureStore(initialState);


      // Dispatch every function in ReactComponent.need = [...] array
      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          const finalState = store.getState();

          // Generate HTML
          const html = renderFullPage(initialView, finalState);

          res.setHeader('content-type', 'text/html');
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

  module.exports = app;
});
