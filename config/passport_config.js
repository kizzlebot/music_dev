var uri = require('url');
var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var LastFmStrategy = require('./lastfm_strategy');
var SoundCloudTokenStrategy = require('passport-soundcloud').Strategy;

var User = require('../models/User');




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var {LASTFM_KEY, LASTFM_SECRET} = process.env;
var LastfmAPI = require('lastfmapi');


var _lastfm = new LastfmAPI({
  'api_key': LASTFM_KEY,
  'secret':LASTFM_SECRET
});





var cb_url ;
if (process.env.HOSTNAME){
  cb_url = `http://${process.env.HOSTNAME}`;
}
else{
  cb_url = `http://localhost:${process.env.PORT}`;
}




passport.use(new SoundCloudTokenStrategy({
  clientID: process.env.SOUNDCLOUD_ID,
  clientSecret: process.env.SOUNDCLOUD_SECRET,
  callbackURL: `${cb_url}/auth/soundcloud/callback`,
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done){

  if (req.user){

    User.findById(req.user.id, (err, user) => {
      if (err) return done(err);


      // check if soundcloud oauth_token already present for this user

      if (user.soundcloud && _.find(req.user.tokens, {type:'soundcloud'})) {
        return done(err, user)
      }
      else {
        user.tokens.push({type:'soundcloud', accessToken, refreshToken, profile});
        user.soundcloud = profile.id;

        user.save(function(err){
          if (err) return done(err);
          req.flash('success', {msg:"Soundcloud authentication success"});
          return done(err, user);
        })
      }
    });
  }
  else{
    req.flash('errors', {msg: 'Need to be logged in first'});
    done(null, false, {message: 'Need to be logged in first'});
  }
}));





/**
 * LocalStrategy
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  // Try to find user by email
  User.findOne({ email: email.toLowerCase() }, function(err, user) {

    // if email not found
    if (!user) {
      return done(null, false, {message: `Email ${email} not found.` });
    }

    // Check if password given matches value in db
    user.comparePassword(password, function(err, isMatch) {
      return (isMatch) ? done(null, user) : done(null, false, { message: 'Invalid email or password.' });
    });
  });
}));




passport.use(new LastFmStrategy({
  'api_key': LASTFM_KEY,
  'secret': LASTFM_SECRET,
  'callbackURL': `${cb_url}}/auth/lastfm/callback`
}, function(req, sessionKey, done) {
  // Find/Update user's lastfm session

  // If user logged in
  if (req.user){
    User.findById(req.user.id, (err, user) => {
      if (err) return done(err);

      user.tokens.push({type:'lastfm', username:sessionKey.username, key:sessionKey.key });
      user.lastfm = sessionKey.key;

      user.save(function(err){
        if (err) return done(err);
        req.flash('success', {msg:"Last.fm authentication success"});
        return done(err, user, sessionKey);
      })
    });
  }
  else{
    User.findOne({lastfm:sessionKey.key}, function(err, existing){
      if (existing){
        req.flash('errors', { msg: 'There is already a Lastfm account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err, existing);
      }
      else{
        done(err);
      }
    })
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
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      }
      else {
        User.findById(req.user.id, function(err, user) {
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.save(function(err) {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  }
  else {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        }
        else {
          var user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save(function(err) {
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
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ github: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      }
      else {
        User.findById(req.user.id, function(err, user) {
          user.github = profile.id;
          user.tokens.push({ kind: 'github', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.avatar_url;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.website = user.profile.website || profile._json.blog;
          user.save(function(err) {
            req.flash('info', { msg: 'GitHub account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  }
  else {
    User.findOne({ github: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
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
          user.save(function(err) {
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
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
          user.save(function(err) {
            req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
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
          user.save(function(err) {
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
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location.name;
          user.profile.picture = user.profile.picture || profile._json.pictureUrl;
          user.profile.website = user.profile.website || profile._json.publicProfileUrl;
          user.save(function(err) {
            req.flash('info', { msg: 'LinkedIn account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.emailAddress }, function(err, existingEmailUser) {
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
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
}));






exports.hasAPI = function(api_name){
  return function(req, res, next){
    if (req.user[api_name]){
      res.redirect('/');
    }
    else{
      next();
    }
  }
}


/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()){
    req.session.returnTo = null;
    next();
  }
  else{
    req.session.returnTo = req.path ;
    res.redirect('/login');
  }
}



/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  var provider = req.path.split('/').slice(-1)[0];
  return (_.find(req.user.tokens, { kind: provider })) ? next() : res.redirect(`/auth/${provider}`);
};
