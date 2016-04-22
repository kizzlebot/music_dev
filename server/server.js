import path from 'path';


/* Server dependencies */
import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';


// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


// React.js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';


// Redux
import  configureStore  from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';




// required react modules
// import routes from '../shared/routes';
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


// Initialize Express App server object
const app = new Express();




// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});


// Testing mode
app.set('test', process.env.NODE_ENV == 'test');
// No output from webpack
app.set('quiet', !!process.env.QUIET);
// PORT for server
app.set('port', serverConfig.port);


// If non-production environment, use wepback-dev-middleware and logger
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  const webpackDevMid = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: app.get('test') || app.get('quiet'),
    quiet: app.get('test') || app.get('quiet'),
    stats: {
      colors: true
    }
  });


  // TODO: Maybe not use
  webpackDevMid.waitUntilValid(function(){
    console.log('Is valid again.........');
    delete require.cache[require.resolve('../shared/routes')];
    routes = require('../shared/routes').default;
  });


  app.use(webpackDevMid);
  app.use(webpackHotMiddleware(compiler));

  // Only use the logger if not testing
  if (!app.get('test')) app.use(logger('dev'));
}




// General Middlwares
var middlewares = [
  bodyParser.json({ limit: '20mb' }),
  bodyParser.urlencoded({ limit: '20mb', extended: false }),
  Express.static(path.resolve(path.join(process.cwd(), '/static')))
];


// Set middlewares
app.use(...middlewares);



















/* -------------------------------------------------------------------------------------- */
/* -------------------------------- SETUP User Config ------------------------------------*/
/* -------------------------------------------------------------------------------------- */
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
      "posts": { "posts": [], "post": {} },
      "auth": { "token": null, "username": "", "isAuthenticated": false, "isAuthenticating": false, "statusText": "" },
      // TODO: Use 'data' key or get rid of
      "data": { "data": null, "isFetching": false },
      "soundcloud": { "oauth_token": null, "shouldShowStream": false, "collection": [], "next_href": null, "page":0, "fetch_success":false, "isFetching":false }
    }


    // create Redux Store
    const store = configureStore(initialState);


    return fetchComponentData(store, renderProps.components, renderProps.params).then(() => {

        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const finalState = store.getState();
        const html = renderFullPage(initialView, finalState);

        res.status(200).end(html);
      });
  });
});
























/* -------------------------------------------------------------------------------------- */
/* ----------------------------- Start/Export Server -------------------------------------*/
/* -------------------------------------------------------------------------------------- */
if (process.env.NODE_ENV != 'test') {
  app.listen(serverConfig.port, (error) => {
    if (!error) console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`);
  });
}




export default app;
