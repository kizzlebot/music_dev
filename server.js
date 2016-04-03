/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname, module) {'use strict';
	
	__webpack_require__(3);
	
	var express = __webpack_require__(4);
	var path = __webpack_require__(5);
	var favicon = __webpack_require__(6);
	var logger = __webpack_require__(7);
	var cookieParser = __webpack_require__(8);
	var bodyParser = __webpack_require__(9);
	var compress = __webpack_require__(10);
	var methodOverride = __webpack_require__(11);
	var passport = __webpack_require__(12);
	var expressValidator = __webpack_require__(13);
	var flash = __webpack_require__(14);
	var session = __webpack_require__(15);
	var MongoStore = __webpack_require__(16)(session);
	var mongoose = __webpack_require__(17);
	var lusca = __webpack_require__(18);
	
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
	
	app.set('port', process.env.PORT || '3000');
	
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
	app.use(express.static(path.join(__dirname, 'public')));
	
	var passportConfig = __webpack_require__(19);
	
	/* ----------------------------------------------------
	 * ----------------------------------------------------
	 *                    Routes
	 * ---------------------------------------------------
	 * --------------------------------------------------- */
	
	var routes = __webpack_require__(35);
	var User = __webpack_require__(32);
	
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
	
	if (false) {
	  console.log("[HMR] Waiting for server-side updates");
	
	  module.hot.accept("components/routes", function () {
	    routes = require("components/routes");
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
	/* WEBPACK VAR INJECTION */}.call(exports, "/", __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-register");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("express-validator");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("express-flash");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("connect-mongo/es5");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("lusca");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var uri = __webpack_require__(20);
	var _ = __webpack_require__(21);
	var passport = __webpack_require__(12);
	var LocalStrategy = __webpack_require__(22).Strategy;
	var FacebookStrategy = __webpack_require__(23).Strategy;
	var GitHubStrategy = __webpack_require__(24).Strategy;
	var GoogleStrategy = __webpack_require__(25).OAuth2Strategy;
	var LinkedInStrategy = __webpack_require__(26).Strategy;
	var LastFmStrategy = __webpack_require__(27);
	var SoundCloudTokenStrategy = __webpack_require__(31).Strategy;
	
	var User = __webpack_require__(32);
	
	passport.serializeUser(function (user, done) {
	  done(null, user.id);
	});
	
	passport.deserializeUser(function (id, done) {
	  User.findById(id, function (err, user) {
	    done(err, user);
	  });
	});
	
	var _process$env = process.env;
	var LASTFM_KEY = _process$env.LASTFM_KEY;
	var LASTFM_SECRET = _process$env.LASTFM_SECRET;
	
	var LastfmAPI = __webpack_require__(30);
	
	var _lastfm = new LastfmAPI({
	  'api_key': LASTFM_KEY,
	  'secret': LASTFM_SECRET
	});
	
	passport.use(new SoundCloudTokenStrategy({
	  clientID: process.env.SOUNDCLOUD_ID,
	  clientSecret: process.env.SOUNDCLOUD_SECRET,
	  callbackURL: 'http://' + (process.env.HOSTNAME || 'localhost') + ':' + (process.env.PORT || 3000) + '/auth/soundcloud/callback',
	  passReqToCallback: true
	}, function (req, accessToken, refreshToken, profile, done) {
	
	  if (req.user) {
	
	    User.findById(req.user.id, function (err, user) {
	      if (err) return done(err);
	
	      // check if soundcloud oauth_token already present for this user
	
	      if (user.soundcloud && _.find(req.user.tokens, { type: 'soundcloud' })) {
	        return done(err, user);
	      } else {
	        user.tokens.push({ type: 'soundcloud', accessToken: accessToken, refreshToken: refreshToken, profile: profile });
	        user.soundcloud = profile.id;
	
	        user.save(function (err) {
	          if (err) return done(err);
	          req.flash('success', { msg: "Soundcloud authentication success" });
	          return done(err, user);
	        });
	      }
	    });
	  } else {
	    req.flash('errors', { msg: 'Need to be logged in first' });
	    done(null, false, { message: 'Need to be logged in first' });
	  }
	}));
	
	/**
	 * LocalStrategy
	 * Sign in using Email and Password.
	 */
	passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
	  // Try to find user by email
	  User.findOne({ email: email.toLowerCase() }, function (err, user) {
	
	    // if email not found
	    if (!user) {
	      return done(null, false, { message: 'Email ' + email + ' not found.' });
	    }
	
	    // Check if password given matches value in db
	    user.comparePassword(password, function (err, isMatch) {
	      return isMatch ? done(null, user) : done(null, false, { message: 'Invalid email or password.' });
	    });
	  });
	}));
	
	passport.use(new LastFmStrategy({
	  'api_key': LASTFM_KEY,
	  'secret': LASTFM_SECRET
	}, function (req, sessionKey, done) {
	  // Find/Update user's lastfm session
	
	  // If user logged in
	  if (req.user) {
	    User.findById(req.user.id, function (err, user) {
	      if (err) return done(err);
	
	      user.tokens.push({ type: 'lastfm', username: sessionKey.username, key: sessionKey.key });
	      user.lastfm = sessionKey.key;
	
	      user.save(function (err) {
	        if (err) return done(err);
	        req.flash('success', { msg: "Last.fm authentication success" });
	        return done(err, user, sessionKey);
	      });
	    });
	  } else {
	    User.findOne({ lastfm: sessionKey.key }, function (err, existing) {
	      if (existing) {
	        req.flash('errors', { msg: 'There is already a Lastfm account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
	        done(err, existing);
	      } else {
	        done(err);
	      }
	    });
	  }
	}));
	
	/**
	 * Sign in with Facebook.
	 */
	passport.use(new FacebookStrategy({
	  clientID: process.env.FACEBOOK_ID,
	  clientSecret: process.env.FACEBOOK_SECRET,
	  callbackURL: '/auth/facebook/callback',
	  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
	  passReqToCallback: true
	}, function (req, accessToken, refreshToken, profile, done) {
	  if (req.user) {
	    User.findOne({ facebook: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
	        done(err);
	      } else {
	        User.findById(req.user.id, function (err, user) {
	          user.facebook = profile.id;
	          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
	          user.profile.name = user.profile.name || profile.displayName;
	          user.profile.gender = user.profile.gender || profile._json.gender;
	          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
	          user.save(function (err) {
	            req.flash('info', { msg: 'Facebook account has been linked.' });
	            done(err, user);
	          });
	        });
	      }
	    });
	  } else {
	    User.findOne({ facebook: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        return done(null, existingUser);
	      }
	      User.findOne({ email: profile._json.email }, function (err, existingEmailUser) {
	        if (existingEmailUser) {
	          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
	          done(err);
	        } else {
	          var user = new User();
	          user.email = profile._json.email;
	          user.facebook = profile.id;
	          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
	          user.profile.name = profile.displayName;
	          user.profile.gender = profile._json.gender;
	          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
	          user.profile.location = profile._json.location ? profile._json.location.name : '';
	          user.save(function (err) {
	            done(err, user);
	          });
	        }
	      });
	    });
	  }
	}));
	
	/**
	 * GitHub.
	 */
	passport.use(new GitHubStrategy({
	  clientID: process.env.GITHUB_ID,
	  clientSecret: process.env.GITHUB_SECRET,
	  callbackURL: '/auth/github/callback',
	  passReqToCallback: true
	}, function (req, accessToken, refreshToken, profile, done) {
	  if (req.user) {
	    User.findOne({ github: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
	        done(err);
	      } else {
	        User.findById(req.user.id, function (err, user) {
	          user.github = profile.id;
	          user.tokens.push({ kind: 'github', accessToken: accessToken });
	          user.profile.name = user.profile.name || profile.displayName;
	          user.profile.picture = user.profile.picture || profile._json.avatar_url;
	          user.profile.location = user.profile.location || profile._json.location;
	          user.profile.website = user.profile.website || profile._json.blog;
	          user.save(function (err) {
	            req.flash('info', { msg: 'GitHub account has been linked.' });
	            done(err, user);
	          });
	        });
	      }
	    });
	  } else {
	    User.findOne({ github: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        return done(null, existingUser);
	      }
	      User.findOne({ email: profile._json.email }, function (err, existingEmailUser) {
	        if (existingEmailUser) {
	          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' });
	          done(err);
	        } else {
	          var user = new User();
	          user.email = profile._json.email;
	          user.github = profile.id;
	          user.tokens.push({ kind: 'github', accessToken: accessToken });
	          user.profile.name = profile.displayName;
	          user.profile.picture = profile._json.avatar_url;
	          user.profile.location = profile._json.location;
	          user.profile.website = profile._json.blog;
	          user.save(function (err) {
	            done(err, user);
	          });
	        }
	      });
	    });
	  }
	}));
	
	/**
	 * Google.
	 */
	passport.use(new GoogleStrategy({
	  clientID: process.env.GOOGLE_ID,
	  clientSecret: process.env.GOOGLE_SECRET,
	  callbackURL: '/auth/google/callback',
	  passReqToCallback: true
	}, function (req, accessToken, refreshToken, profile, done) {
	  if (req.user) {
	    User.findOne({ google: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
	        done(err);
	      } else {
	        User.findById(req.user.id, function (err, user) {
	          user.google = profile.id;
	          user.tokens.push({ kind: 'google', accessToken: accessToken });
	          user.profile.name = user.profile.name || profile.displayName;
	          user.profile.gender = user.profile.gender || profile._json.gender;
	          user.profile.picture = user.profile.picture || profile._json.image.url;
	          user.save(function (err) {
	            req.flash('info', { msg: 'Google account has been linked.' });
	            done(err, user);
	          });
	        });
	      }
	    });
	  } else {
	    User.findOne({ google: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        return done(null, existingUser);
	      }
	      User.findOne({ email: profile.emails[0].value }, function (err, existingEmailUser) {
	        if (existingEmailUser) {
	          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
	          done(err);
	        } else {
	          var user = new User();
	          user.email = profile.emails[0].value;
	          user.google = profile.id;
	          user.tokens.push({ kind: 'google', accessToken: accessToken });
	          user.profile.name = profile.displayName;
	          user.profile.gender = profile._json.gender;
	          user.profile.picture = profile._json.image.url;
	          user.save(function (err) {
	            done(err, user);
	          });
	        }
	      });
	    });
	  }
	}));
	
	/*
	 *  LinkedIn
	 */
	passport.use(new LinkedInStrategy({
	  clientID: process.env.LINKEDIN_ID,
	  clientSecret: process.env.LINKEDIN_SECRET,
	  callbackURL: 'http://127.0.0.1/auth/linkedin/callback',
	  scope: ['r_basicprofile', 'r_emailaddress'],
	  passReqToCallback: true
	}, function (req, accessToken, refreshToken, profile, done) {
	  if (req.user) {
	    User.findOne({ linkedin: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
	        done(err);
	      } else {
	        User.findById(req.user.id, function (err, user) {
	          user.linkedin = profile.id;
	          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
	          user.profile.name = user.profile.name || profile.displayName;
	          user.profile.location = user.profile.location || profile._json.location.name;
	          user.profile.picture = user.profile.picture || profile._json.pictureUrl;
	          user.profile.website = user.profile.website || profile._json.publicProfileUrl;
	          user.save(function (err) {
	            req.flash('info', { msg: 'LinkedIn account has been linked.' });
	            done(err, user);
	          });
	        });
	      }
	    });
	  } else {
	    User.findOne({ linkedin: profile.id }, function (err, existingUser) {
	      if (existingUser) {
	        return done(null, existingUser);
	      }
	      User.findOne({ email: profile._json.emailAddress }, function (err, existingEmailUser) {
	        if (existingEmailUser) {
	          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
	          done(err);
	        } else {
	          var user = new User();
	          user.linkedin = profile.id;
	          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
	          user.email = profile._json.emailAddress;
	          user.profile.name = profile.displayName;
	          user.profile.location = profile._json.location.name;
	          user.profile.picture = profile._json.pictureUrl;
	          user.profile.website = profile._json.publicProfileUrl;
	          user.save(function (err) {
	            done(err, user);
	          });
	        }
	      });
	    });
	  }
	}));
	
	exports.hasAPI = function (api_name) {
	  return function (req, res, next) {
	    if (req.user[api_name]) {
	      res.redirect('/');
	    } else {
	      next();
	    }
	  };
	};
	
	/**
	 * Login Required middleware.
	 */
	exports.isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated()) {
	    req.session.returnTo = null;
	    next();
	  } else {
	    req.session.returnTo = req.path;
	    res.redirect('/login');
	  }
	};
	
	/**
	 * Authorization Required middleware.
	 */
	exports.isAuthorized = function (req, res, next) {
	  var provider = req.path.split('/').slice(-1)[0];
	  return _.find(req.user.tokens, { kind: provider }) ? next() : res.redirect('/auth/' + provider);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("passport-facebook");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("passport-github");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("passport-google-oauth");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("passport-linkedin-oauth2");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var util = __webpack_require__(28);
	var Strategy = __webpack_require__(29);
	var LastfmAPI = __webpack_require__(30);
	
	function LastfmStrategy(options, verify) {
		if (!options.api_key) {
			throw new TypeError('LastfmStrategy requires a api_key option');
		}
		if (!verify) {
			throw new TypeError('LastfmStrategy requires verify callback');
		}
	
		Strategy.call(this);
	
		this.name = 'lastfm';
		this.api_key = options.api_key;
		this.secret = options.secret;
	
		this._verify = verify;
		this._lastfm = new LastfmAPI({
			'api_key': this.api_key,
			'secret': this.secret
		});
	}
	
	LastfmStrategy.prototype.authenticate = function (req, options) {
		var self = this;
		var authUrl = self._lastfm.getAuthenticationUrl() + ('&cb=http://localhost:' + (process.env.PORT || 3000) + '/auth/lastfm/callback');
	
		if (req.query && req.query.token) {
			var token = req.query.token;
	
			this._lastfm.authenticate(req.query.token, function (er, session) {
				if (!session) self.fail(session, 403);
	
				// Build the done() function called by the verify function
				function verified(err, user, session) {
	
					if (err) self.error(err);else if (!user) self.fail(user, session);else self.success(user, session);
				}
	
				self._verify(req, session, verified);
			});
		} else {
			self.redirect(authUrl);
		}
	};
	
	util.inherits(LastfmStrategy, Strategy);
	
	module.exports = exports = LastfmStrategy;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("passport-strategy");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("lastfmapi");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("passport-soundcloud");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bcrypt = __webpack_require__(33);
	var crypto = __webpack_require__(34);
	var mongoose = __webpack_require__(17);
	
	var userSchema = new mongoose.Schema({
	  email: { type: String, unique: true, lowercase: true },
	  password: String,
	
	  facebook: String,
	
	  google: String,
	  github: String,
	
	  linkedin: String,
	  lastfm: String,
	  soundcloud: String,
	  tokens: Array,
	
	  profile: {
	    name: { type: String, default: '' },
	    gender: { type: String, default: '' },
	    location: { type: String, default: '' },
	    website: { type: String, default: '' },
	    picture: { type: String, default: '' }
	  },
	
	  resetPasswordToken: String,
	  resetPasswordExpires: Date
	});
	
	/**
	 * Password hash middleware.
	 */
	userSchema.pre('save', function (next) {
	  var user = this;
	  if (!user.isModified('password')) return next();
	  bcrypt.genSalt(10, function (err, salt) {
	    if (err) return next(err);
	
	    bcrypt.hash(user.password, salt, null, function (err, hash) {
	      if (err) return next(err);
	      user.password = hash;
	      next();
	    });
	  });
	});
	
	/**
	 * Helper method for validating user's password.
	 */
	userSchema.methods.comparePassword = function (candidatePassword, cb) {
	  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
	    if (err) {
	      return cb(err);
	    }
	    cb(null, isMatch);
	  });
	};
	
	/**
	 * Helper method for getting user's gravatar.
	 */
	userSchema.methods.gravatar = function (size) {
	  if (!size) {
	    size = 200;
	  }
	  if (!this.email) {
	    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
	  }
	  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
	  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
	};
	
	module.exports = mongoose.model('User', userSchema);

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var fs = __webpack_require__(36);
	var path = __webpack_require__(5);
	
	var dirs = path.dirname(module.filename);
	var currFilename = module.filename.replace(dirs + '/', '');
	
	/**
	 * Reads dir content names as array and reduces it, excluding elements for which the valid callback
	 * returns false for.
	 * @param  {string} dirname   The directory to look through
	 * @param  {fs.State} valid   Called with `stat` object as argument
	 * @return {Object}           Key-value of filenames
	 */
	/*
	function getPathInfo(dirname = __dirname, valid){
	  return  fs.readdirSync(dirname)
	            .reduce( (prev, curr) => {
	              // if valid says no then skip
	
	              var stat = fs.statSync(path.join(dirname, curr));
	              if (!valid(stat) || curr == currFilename) return prev;
	
	              // otherwise add to prev and return prev
	              var name = curr.replace(/(.*)\.(.*?)$/, "$1");
	
	              prev[name] = path.join(dirname, curr);
	              return prev;
	            }, {});
	}
	function getFiles(dirname){
	  return getPathInfo(dirname, (stat) => stat.isFile());
	}
	
	function getDirectories(dirname){
	  return getPathInfo(dirname, (stat) => stat.isDirectory());
	}
	
	
	var toExport = {};
	var files = getFiles(__dirname);
	
	Object.keys(files).forEach((k) => {
	  toExport[k] = require(files[k]);
	})
	*/
	
	var home = __webpack_require__(37);
	var user = __webpack_require__(38);
	
	var toExport = {
	  home: home,
	  user: user
	};
	
	module.exports = toExport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var express = __webpack_require__(4);
	var router = express.Router();
	
	var LastfmAPI = __webpack_require__(30);
	
	// var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';
	
	var _lastfm = new LastfmAPI({
		'api_key': process.env.LASTFM_KEY,
		'secret': process.env.LASTFM_SECRET
	});
	
	// module.exports = _lastfm;
	
	exports.index = function (req, res, next) {
		if (req.users) {
			var session = req.user.tokens.reduce(function (prev, curr) {
				if (prev) return prev;
				if (curr.type == 'lastfm') return curr;
				return prev;
			}, null);
			if (session) {
				_lastfm.setSessionCredentials(session.username, session.key);
				_lastfm.user.getInfo(function (err, data) {
					return res.render('index', { title: 'expressf', lastfm: data });
				});
			}
		} else res.render('index', { title: 'express' });
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(21);
	var async = __webpack_require__(39);
	var crypto = __webpack_require__(34);
	var nodemailer = __webpack_require__(40);
	var transporter = nodemailer.createTransport({
	  service: 'SendGrid',
	  auth: {
	    user: process.env.SENDGRID_USER,
	    pass: process.env.SENDGRID_PASSWORD
	  }
	});
	
	var passport = __webpack_require__(12);
	var User = __webpack_require__(32);
	
	/**
	 * GET /login
	 * Login page.
	 */
	exports.getLogin = function (req, res) {
	  if (req.user) return res.redirect('/');
	
	  res.render('account/login', {
	    title: 'Login to Account'
	  });
	};
	
	/**
	 * GET /contact
	 * Contact form page.
	 */
	exports.getContact = function (req, res) {
	  res.render('contact', {
	    title: 'Contact'
	  });
	};
	
	exports.getSignup = function (req, res) {
	  if (req.user) {
	    return res.status(302).redirect('/');
	  }
	  res.render('account/signup', {
	    title: 'Create Account'
	  });
	};
	
	/**
	 * GET /account
	 * Profile page.
	 */
	exports.getAccount = function (req, res) {
	  res.render('account/profile', {
	    title: 'Account Management'
	  });
	};
	
	/**
	 * GET /forgot
	 * Forgot Password page.
	 */
	exports.getForgot = function (req, res) {
	  if (req.isAuthenticated()) {
	    return res.redirect('/');
	  }
	  res.render('account/forgot', {
	    title: 'Forgot Password'
	  });
	};
	
	/**
	 * GET /account/unlink/:provider
	 * Unlink OAuth provider.
	 */
	exports.getOauthUnlink = function (req, res, next) {
	  var provider = req.params.provider;
	  User.findById(req.user.id, function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    user[provider] = undefined;
	    user.tokens = _.reject(user.tokens, function (token) {
	      return token.kind === provider;
	    });
	    user.save(function (err) {
	      if (err) return next(err);
	      req.flash('info', { msg: provider + ' account has been unlinked.' });
	      res.redirect('/account');
	    });
	  });
	};
	
	/**
	 * GET /reset/:token
	 * Reset Password page.
	 */
	exports.getReset = function (req, res, next) {
	  if (req.isAuthenticated()) {
	    return res.redirect('/');
	  }
	  User.findOne({ passwordResetToken: req.params.token }).where('passwordResetExpires').gt(Date.now()).exec(function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
	      return res.redirect('/forgot');
	    }
	    res.render('account/reset', {
	      title: 'Password Reset'
	    });
	  });
	};
	
	/**
	 * POST /login
	 * Sign in using email and password.
	 */
	exports.postLogin = function (req, res, next) {
	  req.assert('email', 'Email is not valid').isEmail();
	  req.assert('password', 'Password cannot be blank').notEmpty();
	  req.sanitize('email').normalizeEmail();
	
	  var errors = req.validationErrors();
	
	  if (errors) {
	    req.flash('errors', errors);
	    return res.status(401).render('account/login');
	  }
	
	  passport.authenticate('local', function (err, user, info) {
	    if (err) return next(err);else if (!user) {
	      req.flash('errors', { msg: info.message });
	      return res.status(401).render('account/login');
	    }
	
	    req.logIn(user, function (err) {
	      if (err) return next(err);
	
	      req.flash('success', { msg: 'Success! You are logged in.' });
	      res.status(202).redirect(req.session.returnTo || '/');
	    });
	  })(req, res, next);
	};
	
	/**
	 * GET /logout
	 * Log out.
	 */
	exports.logout = function (req, res) {
	  req.logout();
	  res.redirect('/');
	};
	
	exports.postContact = function (req, res) {
	  req.assert('name', 'Name cannot be blank').notEmpty();
	  req.assert('email', 'Email is not valid').isEmail();
	  req.assert('message', 'Message cannot be blank').notEmpty();
	
	  var errors = req.validationErrors();
	
	  if (errors) {
	    req.flash('errors', errors);
	    return res.redirect('/contact');
	  }
	
	  var from = req.body.email;
	  var name = req.body.name;
	  var body = req.body.message;
	  var to = 'your@email.com';
	  var subject = 'Contact Form | Hackathon Starter';
	
	  var mailOptions = {
	    to: to,
	    from: from,
	    subject: subject,
	    text: body
	  };
	
	  transporter.sendMail(mailOptions, function (err) {
	    if (err) {
	      req.flash('errors', { msg: err.message });
	      return res.redirect('/contact');
	    }
	    req.flash('success', { msg: 'Email has been sent successfully!' });
	    res.redirect('/contact');
	  });
	};
	
	/**
	 * POST /signup
	 * Create a new local account.
	 */
	exports.postSignup = function (req, res, next) {
	  req.assert('email', 'Email is not valid').isEmail();
	  req.assert('password', 'Password must be at least 4 characters long').len(4);
	  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
	
	  var errors = req.validationErrors();
	
	  if (errors) {
	    req.flash('errors', errors);
	    return res.redirect('/signup');
	  }
	
	  var user = new User({
	    email: req.body.email,
	    password: req.body.password
	  });
	
	  User.findOne({ email: req.body.email }, function (err, existingUser) {
	    if (existingUser) {
	      // req.flash('errors', { msg: 'Account with that email address already exists.' });
	      return res.render('/account/signup', { msg: 'Account with that email address already exists' });
	    }
	    user.save(function (err) {
	      if (err) {
	        return next(err);
	      }
	      req.logIn(user, function (err) {
	        if (err) {
	          return next(err);
	        }
	        res.redirect('/');
	      });
	    });
	  });
	};
	
	/**
	 * POST /account/profile
	 * Update profile information.
	 */
	exports.postUpdateProfile = function (req, res, next) {
	  User.findById(req.user.id, function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    user.email = req.body.email || '';
	    user.profile.name = req.body.name || '';
	    user.profile.gender = req.body.gender || '';
	    user.profile.location = req.body.location || '';
	    user.profile.website = req.body.website || '';
	    user.save(function (err) {
	      if (err) {
	        return next(err);
	      }
	      req.flash('success', { msg: 'Profile information updated.' });
	      res.redirect('/account');
	    });
	  });
	};
	
	/**
	 * POST /account/password
	 * Update current password.
	 */
	exports.postUpdatePassword = function (req, res, next) {
	  req.assert('password', 'Password must be at least 4 characters long').len(4);
	  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
	
	  var errors = req.validationErrors();
	
	  if (errors) {
	    req.flash('errors', errors);
	    return res.redirect('/account');
	  }
	
	  User.findById(req.user.id, function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    user.password = req.body.password;
	    user.save(function (err) {
	      if (err) {
	        return next(err);
	      }
	      req.flash('success', { msg: 'Password has been changed.' });
	      res.redirect('/account');
	    });
	  });
	};
	
	/**
	 * POST /account/delete
	 * Delete user account.
	 */
	exports.postDeleteAccount = function (req, res, next) {
	  User.remove({ _id: req.user.id }, function (err) {
	    if (err) {
	      return next(err);
	    }
	    req.logout();
	    req.flash('info', { msg: 'Your account has been deleted.' });
	    res.redirect('/');
	  });
	};
	
	/**
	 * POST /reset/:token
	 * Process the reset password request.
	 */
	exports.postReset = function (req, res, next) {
	  req.assert('password', 'Password must be at least 4 characters long.').len(4);
	  req.assert('confirm', 'Passwords must match.').equals(req.body.password);
	
	  var errors = req.validationErrors();
	
	  if (errors) {
	    req.flash('errors', errors);
	    return res.redirect('back');
	  }
	
	  async.waterfall([function (done) {
	    User.findOne({ passwordResetToken: req.params.token }).where('passwordResetExpires').gt(Date.now()).exec(function (err, user) {
	      if (err) {
	        return next(err);
	      }
	      if (!user) {
	        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
	        return res.redirect('back');
	      }
	      user.password = req.body.password;
	      user.passwordResetToken = undefined;
	      user.passwordResetExpires = undefined;
	      user.save(function (err) {
	        if (err) {
	          return next(err);
	        }
	        req.logIn(user, function (err) {
	          done(err, user);
	        });
	      });
	    });
	  }, function (user, done) {
	    var transporter = nodemailer.createTransport({
	      service: 'SendGrid',
	      auth: {
	        user: process.env.SENDGRID_USER,
	        pass: process.env.SENDGRID_PASSWORD
	      }
	    });
	    var mailOptions = {
	      to: user.email,
	      from: 'hackathon@starter.com',
	      subject: 'Your Hackathon Starter password has been changed',
	      text: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
	    };
	    transporter.sendMail(mailOptions, function (err) {
	      req.flash('success', { msg: 'Success! Your password has been changed.' });
	      done(err);
	    });
	  }], function (err) {
	    if (err) {
	      return next(err);
	    }
	    res.redirect('/');
	  });
	};
	
	/**
	 * POST /forgot
	 * Create a random token, then the send user an email with a reset link.
	 */
	exports.postForgot = function (req, res, next) {
	  req.assert('email', 'Please enter a valid email address.').isEmail();
	
	  var errors = req.validationErrors();
	
	  if (errors) {
	    req.flash('errors', errors);
	    return res.redirect('/forgot');
	  }
	
	  async.waterfall([function (done) {
	    crypto.randomBytes(16, function (err, buf) {
	      var token = buf.toString('hex');
	      done(err, token);
	    });
	  }, function (token, done) {
	    User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
	      if (!user) {
	        req.flash('errors', { msg: 'No account with that email address exists.' });
	        return res.redirect('/forgot');
	      }
	      user.passwordResetToken = token;
	      user.passwordResetExpires = Date.now() + 3600000; // 1 hour
	      user.save(function (err) {
	        done(err, token, user);
	      });
	    });
	  }, function (token, user, done) {
	    var transporter = nodemailer.createTransport({
	      service: 'SendGrid',
	      auth: {
	        user: process.env.SENDGRID_USER,
	        pass: process.env.SENDGRID_PASSWORD
	      }
	    });
	    var mailOptions = {
	      to: user.email,
	      from: 'hackathon@starter.com',
	      subject: 'Reset your password on Hackathon Starter',
	      text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
	    };
	    transporter.sendMail(mailOptions, function (err) {
	      req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
	      done(err, 'done');
	    });
	  }], function (err) {
	    if (err) {
	      return next(err);
	    }
	    res.redirect('/forgot');
	  });
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("async");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("nodemailer");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map