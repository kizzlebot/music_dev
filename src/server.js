import * as ReactRouter from "react-router";
import { createMemoryHistory, useQueries } from 'history';
// require("babel-register");

var express = require('express');
var _ = require('lodash');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var compress = require('compression');
// var methodOverride = require('method-override');
var passport = require('passport');
// var expressValidator = require('express-validator');
// var flash = require('express-flash');
// var session = require('express-session');
// var MongoStore = require('connect-mongo/es5')(session);
// var mongoose = require('mongoose');
// var lusca = require('lusca');
// var errorHandler = require('errorhandler');
// var sass = require('node-sass-middleware');


// var LastfmAPI = require('lastfmapi');
// var _lastfm = new LastfmAPI({api_key:process.env.LASTFM_KEY, secret:process.env.LASTFM_SECRET});
var app = express();




var middlewareLoader = require('./server/config/middleware');


middlewareLoader(app, __dirname, () => {


  var passportConfig = require('./server/config/passport_config');





  /* ----------------------------------------------------
   * ----------------------------------------------------
   *                    Routes
   * ---------------------------------------------------
   * --------------------------------------------------- */


  var routes = require('./server/controllers/');
  var User = require('./server/models/User');




  var React = require('react');
  var ReactDOM = require('react-dom');
  var ReactDOMServer = require('react-dom/server');
  // var createRoutes = require('./components/routes');


  var DOM = React.DOM;
  var body = DOM.body; var div = DOM.div; var script = DOM.script;


  // var reactRoutes = require('./components/routes/routes.js').default;
  // var mainStyle = require('!raw!sass!./components/style/main.scss');




  var scriptPath = (process.env.NODE_ENV == 'development') ? 'http://localhost:8080/dist/client.js' : '/dist/client.js';
  // app.get('*', function(req, res, next){


  //   var reactContent = ReactDOMServer.renderToString(React.createElement(reactRoutes, {}))
  //   var style = '/style/main.css';

  //   var page = React.createElement('html', null,
  //     React.createElement('head', null,
  //       // React.createElement('link', { type: 'text/css', rel:'stylesheet', href: style }),
  //       // React.createElement('style', null, mainStyle),
  //       null
  //     ),
  //     React.createElement('body', null,
  //       React.createElement('div', {
  //         id: 'react-root',
  //         dangerouslySetInnerHTML: {__html:reactContent}
  //       }),
  //       React.createElement('script', {src: scriptPath})
  //     )
  //   );


  //   res.header("Content-Type", "text/html");
  //   var html = ReactDOMServer.renderToStaticMarkup(page);
  //   res.send(html);
  // });


  app.get('/', routes.home.index);


  app.get('/login', routes.user.getLogin);
  app.get('/signup', routes.user.getSignup);
  app.get('/logout', routes.user.logout);
  app.get('/contact', routes.user.getContact);
  app.get('/forgot', routes.user.getForgot);
  app.get('/reset/:token', routes.user.getReset);

  app.get('/account', passportConfig.isAuthenticated, routes.user.getAccount);
  app.get('/account/unlink/:provider', passportConfig.isAuthenticated, routes.user.getOauthUnlink);



  app.use('/api', routes.api);









  app.post('/login', routes.user.postLogin);
  app.post('/signup', routes.user.postSignup);
  app.post('/contact', routes.user.postContact);
  app.post('/forgot', routes.user.postForgot);
  app.post('/reset/:token', routes.user.postReset);
  app.post('/signup', routes.user.postSignup);
  app.post('/reset/:token', routes.user.postReset);
  app.post('/account/profile', passportConfig.isAuthenticated, routes.user.postUpdateProfile);
  app.post('/account/password', passportConfig.isAuthenticated, routes.user.postUpdatePassword);
  app.post('/account/delete', passportConfig.isAuthenticated, routes.user.postDeleteAccount);









  app.get('/auth/soundcloud', passportConfig.isAuthenticated, passport.authenticate('soundcloud'));
  app.get('/auth/soundcloud/callback', passport.authenticate('soundcloud', { failureRedirect:'/login' }), function(req, res, next){
      res.redirect(req.session.returnTo || '/');
  });


  //
  app.get('/auth/lastfm', passportConfig.isAuthenticated, passport.authenticate('lastfm'));
  app.get('/auth/lastfm/callback', function(req, res, next){
    passport.authenticate('lastfm', { failureRedirect:'/login' }, function(err, user, sesh){
      res.redirect(req.session.returnTo || '/');
    })(req, {} );
  });


  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });


  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });


  app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });


  app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });








  if (app.get('env') === 'development') {
    if (module.hot) {
      console.log(`[HMR] Waiting for server-side updates on ${app.get('port')}`);

      module.hot.accept("components/routes/routes", () => {
        reactRoutes = require("components/routes/routes");
      });

      module.hot.addStatusHandler((status) => {
        if (status === "abort") {
          setTimeout(() => process.exit(0), 0);
        }
      });
    }
  }

});









// If file was loaded directly (ie via npm start) then start the server and export it.
// Otherwise if 'required' from another file export express app without starting server
module.exports = (process.env.NODE_ENV !== 'test') ? app.listen(app.get('port'), () => console.log('Example app listening at port %s', app.get('port'))) : app;
