import User from '../models/user';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';



export function getUsers(req, res) {
  // TODO: Need to implement querying
  User.find({}, function(err, users){
    if (err) res.status(500).send(err);
    else res.json({ users });
  })
}




export function authenticate(req, res, next){
  var { auth_token, username, password } = req.body;
  // If username and password present then attemp to authenticate
  if (username && password){
    findByUsernamePassword(username, password, (message) => {
      if (!message.success) res.status(401).json(message);
      else res.json(message);
    });
  }
  else{
    res.status(403).json({
      success:false,
      message:'No credentials provided'
    })
  }
};



export function register(req, res, next){
  var { username, password, confirmPassword } = req.body ;
  var msg = {
    success:true,
    message:null,
    reason:[]
  }

  // See if user already exists
  User.find({ username }, function(err, existingUsers){
    if (err) return res.json(msg);
    if (!existingUsers || existingUsers.length > 0){
      msg.success &= false;
      msg.message = `Registration failed.`;
      msg.reason.push('username')
    }
    if (password.length < 7){
      msg.success &= false;
      msg.message = `Registration failed.`;
      msg.reason.push('password length');
    }
    if (password != confirmPassword){
      msg.success &= false;
      msg.message = `Registration failed.`;
      msg.reason.push('password does not match');
    }




    // If msg.success is now false return 403
    if(!msg.success) res.status(403).json(msg);
    // Otherwise create a new user
    else{
      var newUser = new User({ username, password });
      var auth_token = jwt.sign(newUser, serverConfig.secret, { expiresIn: '1440h' });
      msg.auth_token = auth_token;
      newUser.auth_token = auth_token;

      newUser.save(function(err, u){
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





function findByUsernamePassword(username, password, callback){
  User.findOne({ username }, function(err, user){
    if (err) throw err;

    // if user with given username not found
    if (!user){
      callback({ success: false, message: `User with username ${username} not found`})
    }
    else {
      // Compare password and respond
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          callback({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        }
        else{
          var auth_token = jwt.sign(user, serverConfig.secret, { expiresInMinutes: 1440 })
          callback({
            success:true,
            message:'Authentication success.',
            auth_token
          })
        }
      });
    }
  });
}
