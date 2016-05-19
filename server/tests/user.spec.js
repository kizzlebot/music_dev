/* global describe, it, expect, before, request, assert */
import mongoose from 'mongoose';



var User = require('../models/user').default ;


var defaultUser = { email: 'test@gmail.com', password: 'abcdefg' };
var serverConfig = require('../config');
var server ;



var connectDB = (done)  => {
  if (mongoose.connection.name !== 'music_dev_test') return done();
  mongoose.connect(serverConfig.mongoURL, function(err) {
    // if (err) return done(err);
    done();
  });
}

var dropDB = (done) => {
  if (mongoose.connection.name !== 'music_dev_test') return done();
  mongoose.connection.db.dropDatabase(function(err) {
    mongoose.connection.close(done);
  });
}



describe('User Model', function() {
  before(function(done) {
    connectDB(done);
  });

  after(function(done) {
    dropDB(done)
  });




  //
  it('should create a new user', function(done) {
   var user = new User(defaultUser);

   user.save(function(err) {
    //  expect(err).to.equal(null);
      expect(user).is.not.undefined;
      done();
   });
  });


  it('should not create a user without a unique email', function(done) {
   var user = new User(defaultUser);

   user.save(function(err) {
     if (err) err.code.should.equal(11000);
     done();
   });
  });


  it('should find user by email', function(done) {
   User.findOne({ email: 'test@gmail.com' }, function(err, user) {
     if (err) return done(err);
     expect(user).to.not.be.undefined;
     done();
   });
  });



  it('should delete a user', function(done) {
   User.remove({ email: 'test@gmail.com' }, function(err) {
     if (err) return done(err);
     done();
   });
  });
});
