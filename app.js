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

var app = express();









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


app.use((req, res, next) => {
  res.locals.user = req.user;
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  if(res.locals._csrf) res.cookie('csrf', res.locals._csrf);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));






var routes = require('./controllers');


app.get('/', routes.home.index);
app.post('/login', routes.user.postLogin);
app.post('/forgot', routes.user.postForgot);
app.post('/reset/:token', routes.user.postReset);
app.post('/signup', routes.user.postSignup);
// app.post('/contact', contactController.postContact);
// app.post('/account/profile', passportConfig.isAuthenticated, routes.user.postUpdateProfile);
// app.post('/account/password', passportConfig.isAuthenticated, routes.user.postUpdatePassword);
// app.post('/account/delete', passportConfig.isAuthenticated, routes.user.postDeleteAccount);
// app.get('/account/unlink/:provider', passportConfig.isAuthenticated, routes.user.getOauthUnlink);













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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = (require.main == module) ? app.listen(app.get('port'), () => console.log('Example app listening at port %s', app.get('port'))) : app;
