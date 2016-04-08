import * as ReactRouter from "react-router";
import { createMemoryHistory, useQueries } from 'history';
// require("babel-register");

var express = require('express');
var _ = require('lodash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var passport = require('passport');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var mongoose = require('mongoose');
var lusca = require('lusca');
var errorHandler = require('errorhandler');



var LastfmAPI = require('lastfmapi');
var _lastfm = new LastfmAPI({api_key:process.env.LASTFM_KEY, secret:process.env.LASTFM_SECRET});
var app = express();








/* ----------------------------------------------------
 * ----------------------------------------------------
 *                    Middleware
 * ---------------------------------------------------
 * --------------------------------------------------- */


/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});




var port     = process.env.PORT || 8000;
var webpack_port     = process.env.WEBPACK_PORT || 8080;


app.set('port', port);

// view engine setup
app.set('views', path.join(process.cwd(), 'src', 'server', 'views'));
app.set('view engine', 'jade');

app.use(compress());

// Skip logging if test environment
app.use(logger('dev', { skip: (req, res) => (process.env.NODE_ENV == 'test') }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Lusca CSRF
app.use((req, res, next) => {
  (req.path === '/api/upload') ? next() : lusca.csrf()(req, res, next);
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));


app.use((req, res, next) => {
  res.locals.user = req.user;
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  if(res.locals._csrf) {
    res.cookie('csrf', res.locals._csrf);
    res.set('CSRF', res.locals._csrf);
  }

  req.lastfm = _lastfm;

  if (req.user.lastfm){
    var session = _.find(req.user.tokens, {type:'lastfm'});
    req.lastfm.setSessionCredentials(session.username, session.key);
  }

  next();
});




app.use(express.static(path.join(process.cwd(), 'src', 'server', 'public')));



var passportConfig = require('./server/config/passport_config');


















/* ----------------------------------------------------
 * ----------------------------------------------------
 *                    Routes
 * ---------------------------------------------------
 * --------------------------------------------------- */

// var home = require('./server/controllers/home.js');
// var user = require('./server/controllers/user.js');
// var api = require('./server/controllers/api');
var routes = require('./server/controllers/');
var User = require('./server/models/User');




var React = require('react');
var ReactDOM = require('react-dom');
var createRoutes = require('./components/routes');

app.use('*', function(req, res, next){
  var history = useQueries(createMemoryHistory)();
  var routes = createRoutes(history);
  var location = req.path ;


  ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error || !renderProps) {
      console.error(`if (error || !renderProps)`);
      return next(error);
    }

    if (redirectLocation) {
      console.error('redirectLocation hit');
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }



    var reactContent = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, {...renderProps, csrf:res.locals._csrf}))
    var style = '/css/main.css';
    var page = React.createElement('html', null,
      React.createElement('head', null, React.createElement('link', { type: 'text/css', rel:'stylesheet', href: style })),
      React.createElement('body', null,
        React.createElement('div', {
          id: 'react-root',
          dangerouslySetInnerHTML: {__html:reactContent}
        })
      ),
      React.createElement('script', {src:'/dist/bundle.js'}),
    );




    res.header("Content-Type", "text/html");
    var html = ReactDOMServer.renderToStaticMarkup(page);
    res.send(html);
  });
})

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


















/*************************
 * error handlers
 **************************/
app.use(errorHandler());





if (app.get('env') === 'development') {
  if (module.hot) {
    console.log(`[HMR] Waiting for server-side updates on ${app.get('port')}`);

    module.hot.accept("components/routes", () => {
      routes = require("components/routes");
    });

    module.hot.addStatusHandler((status) => {
      if (status === "abort") {
        setTimeout(() => process.exit(0), 0);
      }
    });
  }
}



// If file was loaded directly (ie via npm start) then start the server and export it.
// Otherwise if 'required' from another file export express app without starting server
module.exports = (process.env.NODE_ENV !== 'test') ? app.listen(app.get('port'), () => console.log('Example app listening at port %s', app.get('port'))) : app;
