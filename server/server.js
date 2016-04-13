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
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';


// required react modules
import routes from '../shared/routes';
import { fetchComponentData } from './util/fetchData';
import renderFullPage, { renderError } from './util/renderFullPage';
import posts from './routes/post.routes';
import dummyData from './dummyData';
import serverConfig from './config';


/* -------------------------------------------------------------------------------------- */
/* ----------------------------------- END IMPORTS -------------------------------------- */
/* -------------------------------------------------------------------------------------- */











/* -------------------------------------------------------------------------------------- */
/* -------------------------------- SETUP MIDDLEWARE -------------------------------------*/
/* -------------------------------------------------------------------------------------- */


// Initialize Express App server object
const app = new Express();


// webpack middleware and logger if not in production mode
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  if (process.env.NODE_ENV != 'test') app.use(logger('dev'));
}






// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});





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

app.use('/api', posts);




// --------------------------------------------------------------------
// Server Side Rendering based on routes matched by React-router.
// --------------------------------------------------------------------

app.use((req, res, next) => {


  // React-router match requested path with a react-router route
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err)              return res.status(500).end(renderError(err));
    if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    if (!renderProps)     return next();



    // Initialize redux store
    const initialState = { posts: [], post: {} };
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
