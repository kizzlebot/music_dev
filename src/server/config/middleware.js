var path = require('path');

var _ = require('lodash');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compress = require('compression');
var methodOverride = require('method-override');
var passport = require('passport');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

var lusca = require('lusca');
var errorHandler = require('errorhandler');
var sass = require('node-sass-middleware');

var LastfmAPI = require('lastfmapi');
var _lastfm = new LastfmAPI({api_key:process.env.LASTFM_KEY, secret:process.env.LASTFM_SECRET});



module.exports = (app, dir, callback) => {

  var passportConfig = require('./passport_config');
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
  var webpack_port = process.env.WEBPACK_PORT || 8080;


  app.set('port', port);

  // view engine setup
  app.set('views', path.join(dir, 'server', 'views'));
  app.set('view engine', 'jade');

  app.use(compress());
  app.use(sass({
    src: path.join(dir, 'public'),
    dest: path.join(dir, 'public'),
    sourceMap: true
  }));

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

    if (req.user && req.user.lastfm){
      var session = _.find(req.user.tokens, {type:'lastfm'});
      req.lastfm.setSessionCredentials(session.username, session.key);
    }

    next();
  });
  app.use(express.static(path.join(dir, 'server', 'public')));








  // Do non middleware stuff
  callback(app);







  app.use(errorHandler());

};