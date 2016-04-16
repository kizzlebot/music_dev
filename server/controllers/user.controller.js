import User from '../models/user';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';



export function getUsers(req, res) {
  // TODO: Need to implement
  User.find({}, function(err, users){
    if (err) res.status(500).send(err);
    else res.json({ users });
  })
}

export function postUsers(req, res) {
  // TODO: Need to implement
  res.json({ name:'james' });
}



export function authenticate(req, res, next){
  var { auth_token, username, password } = req.body;
  console.log(req.body);

  // If user POSTS auth_token then first check to see its still valid
  // if (auth_token){
  //   User.findOne({ auth_token }, function(err, user){
  //     if (err) throw err;
  //     if (user){
  //       res.json({
  //         success:true,
  //         message:'Authentication success',
  //         auth_token
  //       })
  //     }
  //     else{
  //       if (username && password){
  //         findByUsernamePassword(username, password, (message) => {
  //           if (!message.success) res.status(401).json(message);
  //           else res.json(message);
  //         });
  //       }
  //     }
  //   });
  // }

  console.log('authenticate');
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
// export function createUser(req, res) {
//   if (!req.body.user.email || !req.body.user.password || !req.body.post.content) {
//     return res.status(401).end();
//   }

//   const newPost = new Post(req.body.post);

//   // Let's sanitize inputs
//   newPost.title = sanitizeHtml(newPost.title);
//   newPost.name = sanitizeHtml(newPost.name);
//   newPost.content = sanitizeHtml(newPost.content);

//   newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
//   newPost.cuid = cuid();

//   newPost.save((err, saved) => {
//     return (err) ? res.status(500).send(err) : res.json({ post: saved })
//   });
// }




// export function getPost(req, res) {
//   const newSlug = req.query.slug.split('-');
//   const newCuid = newSlug[newSlug.length - 1];
//   Post.findOne({ cuid: newCuid }).exec((err, post) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.json({ post });
//   });
// }




// export function deletePost(req, res) {
//   const postId = req.body.postId;
//   Post.findById(postId).exec((err, post) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     post.remove(() => {
//       res.status(200).end();
//     });
//   });
// }
