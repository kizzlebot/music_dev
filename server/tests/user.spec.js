import app from '../server';
var chai = require('chai');
var path = require('path');
var should = chai.should();
var User = require('../models/user');


var defaultUser = { email: 'test@gmail.com', password:'abcdefg' };
var serverConfig = require('../config');

var server ;
describe('User Model', function() {

  before(function(done){
    // Spawn database server
    server = app.listen(process.env.PORT || 8000, (err) => {
      done();
    });
  });

  after(function(done){
    User.remove({ email: 'test@gmail.com' }, function(err) {
      // if (err) return done(err);
      server.close(() => done());
    });
  });





  it('should create a new user', function(done) {
    var user = new User(defaultUser);

    user.save(function(err) {
      expect(err).to.equal(null);
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
      user.email.should.equal('test@gmail.com');
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
