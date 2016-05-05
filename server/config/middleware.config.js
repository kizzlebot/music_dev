/* Server dependencies */
import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';

// Webpack Requirements
import webpack from 'webpack';
import config from '../../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import serverConfig from './index';

var path = require('path');
var routes = require('../../shared/routes').default;

const middlewareConfigurer = (cb) => {
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
      delete require.cache[require.resolve('../../shared/routes')];
      routes = require('../../shared/routes').default;
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

  cb(app);
}



export default middlewareConfigurer;
