require("babel-register");

var express = require('express');
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

var app = express();




/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});





app.set('port', process.env.PORT || '3000');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compress());
app.use(logger('dev', {
  // Skip logging if test environment
  skip: (req, res) => (process.env.NODE_ENV == 'test')
}));
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
// app.use(function(req, res, next) {
//   if (req.path === '/api/upload') next();
//   else lusca.csrf()(req, res, next);
// });
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  // if (/api/i.test(req.path)) req.session.returnTo = req.path;
  if(res.locals._csrf) res.cookie('csrf', res.locals._csrf);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));




require('./config/passport_config');










var routes = require('./controllers');
var User = require('./models/User');


app.get('/', routes.home.index);

app.get('/login', routes.user.getLogin);
app.get('/signup', routes.user.getSignup);
app.get('/logout', routes.user.logout);
app.get('/contact', routes.user.getContact);
app.post('/login', routes.user.postLogin);
app.post('/forgot', routes.user.postForgot);
app.post('/reset/:token', routes.user.postReset);
app.post('/signup', routes.user.postSignup);








app.get('/auth/lastfm', passport.authenticate('lastfm'));
app.get('/auth/lastfm/callback', function(req, res, next){
  passport.authenticate('lastfm', {failureRedirect:'/'}, function(err, user, sesh){
    res.redirect('/');
  })(req, {} );
});



// app.post('/contact', contactController.postContact);
// app.post('/account/profile', passportConfig.isAuthenticated, routes.user.postUpdateProfile);
// app.post('/account/password', passportConfig.isAuthenticated, routes.user.postUpdatePassword);
// app.post('/account/delete', passportConfig.isAuthenticated, routes.user.postDeleteAccount);
// app.get('/account/unlink/:provider', passportConfig.isAuthenticated, routes.user.getOauthUnlink);




// app.get('/auth/lastfm', passport.authenticate('lastfm', {  }));
// app.get('/auth/lastfm/callback', passport.authenticate('lastfm', { failureRedirect: '/login' }), function(req, res) {
//   res.redirect(req.session.returnTo || '/');
// });












/*************************
 * error handlers
 **************************/

/* * development error handlers */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


/* production error handler
 *  - No stacktraces shown to user */
app.use(function(err, req, res, next) {
  // res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = (require.main == module) ? app.listen(app.get('port'), () => console.log('Example app listening at port %s', app.get('port'))) : app;
