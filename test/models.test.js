var chai = require('chai');
var path = require('path');
var should = chai.should();
var User = require(path.join(process.cwd(), '/src/server/models/User'));
var server ;
var app = require(path.join(process.cwd(), 'src', 'server.js'));

var defaultUser = { email: 'test@gmail.com', password:'abcdefg' };


describe('User Model', function() {

  before(function(done){
    // Spawn database server
    server = app.listen(4000, (err) => {
      done();
    });
  });







  it('should create a new user', function(done) {
    var user = new User(defaultUser);

    user.save(function(err) {
      if (err) return done(err);
      done();
    });
  });


  it('should not create a user with the unique email', function(done) {
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


  after(function(done){
    User.remove({ email: 'test@gmail.com' }, function(err) {
      // if (err) return done(err);
      server.close(() => done());
    });

  });

});
