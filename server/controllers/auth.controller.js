import User from '../models/user';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';


/**
 * This function finds given 'username' from database and compares against given
 * password, then calls the callback function which indicates successful or unsuccessful
 *
 * @param {string} username - The username to check the password for
 * @param {string} password - The password for username
 * @param {function} callback - The function to call after user is authenticated or authentication failed
 */
function findByUsernamePassword(username, password, callback) {
  User.findOne({ username }, function(err, user) {
    if (err) throw err;

    // if user with given username not found
    if (!user) {
      callback(null, { success: false, message: `User with username ${username} not found`});
    }
    else {
      // Compare password and respond
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          callback(null, {
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        }
        else {
          var auth_token = jwt.sign({
            username: user.username
          }, serverConfig.secret, { expiresIn: '1440h' });

          callback(user, {
            success: true,
            message: 'Authentication success.',
            username: user.username,
            auth_token
          });
        }
      });
    }
  });
}

var stateKey = 'spotify';

export function getUsers(req, res) {
  // TODO: Need to implement querying
  User.find({}, function(err, users) {
    if (err) res.status(500).send(err);
    else res.json({ users });
  });
}




export function isAuthenticated(req, res, next){
  var access_token = req.headers['x-access-token'];
  if (!access_token){
    res.status(403).json({
      success:false,
      message:'access_token is missing'
    });
    return ;
  }
  else{
    jwt.verify(access_token, serverConfig.secret, (err, decoded) => {
      if (err){
        res.json({success:false, message:'Failed to authenticate token'});
      }
      else{
        req.decoded = decoded ;
        next();
      }
    })
  }
}


export function authenticate(req, res, next) {
  var { auth_token, username, password } = req.body;
  // If username and password present then attemp to authenticate
  if (username && password) {
    findByUsernamePassword(username, password, (user, message) => {
      if (!message.success) res.status(401).json(message);
      else res.json(message);
    });
  }
  else {
    res.status(403).json({
      success: false,
      message: 'No credentials provided'
    });
  }
};


export function register(req, res, next) {
  var { username, password, confirmPassword } = req.body ;
  var msg = {
    success: true,
    message: null,
    reason: []
  };

  // Find a user with the given username
  User.find({ username }, function(err, existingUsers) {
    if (err) {
      msg.message = 'Error in registration';
      return res.json(msg);
    }

    // If user with username already exists, then fail
    if (existingUsers.length > 0) {
      msg.success &= false;
      msg.message = `Registration failed. User with username already exists`;
      msg.reason.push('username');
    }

    // NOTE: Should password.length check be moved before User.find?
    if (password.length < 7) {
      msg.success &= false;
      msg.message = `Registration failed. Password length must be 7 or greater`;
      msg.reason.push('password length');
    }

    // NOTE: Should password != confirmPassword be moved before User.find?
    if (password != confirmPassword) {
      msg.success &= false;
      msg.message = `Registration failed. Password does not match`;
      msg.reason.push('password does not match');
    }


    // If msg.success is now false return 403
    if(!msg.success) res.status(403).json(msg);
    // Otherwise create a new user and send back message
    else {
      var newUser = new User({ username, password });

      var auth_token = jwt.sign({ username: username}, serverConfig.secret, { expiresIn: '1440h' });
      msg.auth_token = auth_token;
      msg.username = username ;
      // newUser.auth_token = auth_token;

      newUser.save(function(err, u) {
        if (err) {
          res.json(err);
          return ;
        }

        msg.message = 'Registration successful.';
        res.json(msg);
      });
    }
  });
}


export function spotifyCodeCallback(req, res, next){
  var {code = null, state = null} = req.query;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (code && state && storedState){
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: '',
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
  else{
    return res.json({msg:'error'});
  }
}
