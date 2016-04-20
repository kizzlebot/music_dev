import mongoose from 'mongoose';

var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, lowercase: true },

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
  resetPasswordExpires: Date,
  dateCreated: { type: 'Date', default: Date.now, required: true }
});





/**
 * Password hash middleware.
 */
userSchema.pre('save', function(next) {

  var _this = this;

  if (!_this.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(_this.password, salt, null, (err, hash) => {
      if (err) return next(err);
      _this.password = hash;
      next();
    });
  });
});


/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};




/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function(sizeArg) {
  var size = (!sizeArg) ? 200 : sizeArg;
  return (!this.email) ? `https://gravatar.com/avatar/?s=${size}&d=retro` :
                         `https://gravatar.com/avatar/${crypto.createHash('md5').update(this.email).digest('hex')}?s=${size}&d=retro`;
};

export default mongoose.model('User', userSchema);
