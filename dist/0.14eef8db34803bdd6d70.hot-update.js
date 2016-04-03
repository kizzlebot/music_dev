exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname, module) {'use strict';

	// require("babel-register");

	var express = __webpack_require__(5);
	var path = __webpack_require__(6);
	var favicon = __webpack_require__(7);
	var logger = __webpack_require__(8);
	var cookieParser = __webpack_require__(9);
	var bodyParser = __webpack_require__(10);
	var compress = __webpack_require__(11);
	var methodOverride = __webpack_require__(12);
	var passport = __webpack_require__(13);
	var expressValidator = __webpack_require__(14);
	var flash = __webpack_require__(15);
	var session = __webpack_require__(16);
	var MongoStore = __webpack_require__(17)(session);
	var mongoose = __webpack_require__(18);
	var lusca = __webpack_require__(19);

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
	mongoose.connection.on('error', function () {
	  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
	  process.exit(1);
	});

	var port = process.env.PORT || 8000;
	var webpack_port = process.env.WEBPACK_PORT || 8080;

	app.set('port', port);

	// view engine setup
	app.set('views', path.join(__dirname, 'server', 'views'));
	app.set('view engine', 'jade');

	app.use(compress());

	// Skip logging if test environment
	app.use(logger('dev', { skip: function skip(req, res) {
	    return process.env.NODE_ENV == 'test';
	  } }));

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
	app.use(function (req, res, next) {
	  req.path === '/api/upload' ? next() : lusca.csrf()(req, res, next);
	});
	app.use(lusca.xframe('SAMEORIGIN'));
	app.use(lusca.xssProtection(true));

	app.use(function (req, res, next) {
	  res.locals.user = req.user;
	  if (/api/i.test(req.path)) req.session.returnTo = req.path;
	  if (res.locals._csrf) {
	    res.cookie('csrf', res.locals._csrf);
	    res.set('CSRF', res.locals._csrf);
	  }
	  next();
	});
	app.use(express.static(path.join(__dirname, 'server', 'public')));

	var passportConfig = __webpack_require__(20);

	/* ----------------------------------------------------
	 * ----------------------------------------------------
	 *                    Routes
	 * ---------------------------------------------------
	 * --------------------------------------------------- */

	var home = __webpack_require__(36);
	var user = __webpack_require__(37);
	var routes = { home: home, user: user };
	var User = __webpack_require__(33);

	app.get('/', routes.home.index);

	app.get('/login', routes.user.getLogin);
	app.get('/signup', routes.user.getSignup);
	app.get('/logout', routes.user.logout);
	app.get('/contact', routes.user.getContact);
	app.get('/forgot', routes.user.getForgot);
	app.get('/reset/:token', routes.user.getReset);
	app.get('/account', passportConfig.isAuthenticated, routes.user.getAccount);
	app.get('/account/unlink/:provider', passportConfig.isAuthenticated, routes.user.getOauthUnlink);

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

	app.get('/auth/soundcloud', passportConfig.isAuthenticated, passportConfig.hasAPI('soundcloud'), passport.authenticate('soundcloud'));
	app.get('/auth/soundcloud/callback', function (req, res) {
	  passport.authenticate('soundcloud', { failureRedirect: '/login' }, function (err, user, sesh) {
	    res.redirect(req.session.returnTo || '/');
	  })(req, {});
	});

	app.get('/auth/lastfm', passportConfig.isAuthenticated, passportConfig.hasAPI('lastfm'), passport.authenticate('lastfm'));
	app.get('/auth/lastfm/callback', function (req, res, next) {
	  passport.authenticate('lastfm', { failureRedirect: '/login' }, function (err, user, sesh) {
	    res.redirect(req.session.returnTo || '/');
	  })(req, {});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
	  res.redirect(req.session.returnTo || '/');
	});

	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
	  res.redirect(req.session.returnTo || '/');
	});

	app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
	  res.redirect(req.session.returnTo || '/');
	});

	app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function (req, res) {
	  res.redirect(req.session.returnTo || '/');
	});

	/*************************
	 * error handlers
	 **************************/

	/* * development error handlers */
	if (app.get('env') === 'development') {
	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	/* production error handler
	 *  - No stacktraces shown to user */
	app.use(function (err, req, res, next) {
	  // res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	if (true) {
	  console.log('[HMR] Waiting for server-side updates on ' + app.get('port'));

	  module.hot.accept(40, function () {
	    routes = __webpack_require__(40);
	  });

	  module.hot.addStatusHandler(function (status) {
	    if (status === "abort") {
	      setTimeout(function () {
	        return process.exit(0);
	      }, 0);
	    }
	  });
	}

	// If file was loaded directly (ie via npm start) then start the server and export it.
	// Otherwise if 'required' from another file export express app without starting server
	module.exports = __webpack_require__.c[0] == module ? app.listen(app.get('port'), function () {
	  return console.log('Example app listening at port %s', app.get('port'));
	}) : app;
	/* WEBPACK VAR INJECTION */}.call(exports, "src", __webpack_require__(4)(module)))

/***/ }

};