/* global describe, it, expect, before, request */


var app = require('../app.js');
var server ;



// var spawn = require('child_process').spawn;




describe('routes', function(){
  before(function(done){
    // Spawn database server
    server = app.listen(4000, (err) => {
      done();
    });
  });



  describe('unauthenticated', function(){

    describe('/', function(){

      describe('GET', function(){
        it('responds with 200 with HTML page', function(done){
          request(server).get('/').expect(200).end(function(err, res){
            expect(res.headers['content-type']).to.include('text/html');
            done();
          })
        });
      })

      describe('POST', function(){
        it('responds with 404', function(done){
          request(server).post('/').expect(404, done);
        });
      });

    });



    describe('/user/register', function(){


      var defaultCredentials = {email:'test@test.com', password:'test'};



      describe('GET', function(){
        it('200 (OK) if not logged in', function(done){
          request(server).get('/user/register').expect(200, done);
        });

        it('451 (Redirect) to / if logged in', function(done){
          request(server).get('/user/register').expect(451).end((err, res) => {
            expect(res.header['location']).to.include('/');
          })
        });
      })




      describe('POST', function(){

        describe('Failure', function(){
          it('409 (conflict) if email already exists', function(done){
            request(server).post('/user/register').send(defaultCredentials).expect(409, done);
          });

          it('409 (conflict) if username already exists', function(done){
            request(server).post('/user/register').send(defaultCredentials).expect(409, done);
          });
        })




        describe('Success', function(){
          it('redirects to /', function(done){
            request(server)
              .post('/user/register')
              .send(defaultCredentials)
              .end((err, res) => {
                expect(res.header['location']).to.include('/');
              });
          });
        })
      });

    });



    describe('/user/login', function(){

      describe('GET', function(){
        it('200 (OK) if not logged', function(done){
          request(server).get('/user/login').expect(200, done);
        });

        it('451 (Redirect) if logged in', function(done){
          request(server).get('/user/login').expect(451, done);
        });
      });

      describe('POST', function(){
        it('401 () with invalid data', function(done){
          request(server).post('/user/login').expect(401, done);
        });

        it('451 (Redirect) on valid data', function(done){
          request(server).post('/user/login').expect(401, done);
        });
      });

    });
  });



  describe('authenticated only', function(){

    describe('/user/logout', function(){
      describe('GET', function(){
        it('200 (OK)', function(done){
          request(server).get('/user/logout').expect(200, done);
        })
      });
      describe('POST', function(){
      });
    });



    // TODO: Need to write test cases for /auth/facebook
    describe('/auth/facebook', function(){});

    // TODO: Need to write test cases for /auth/github
    describe('/auth/github', function(){});

    // TODO: Need to write test cases for /auth/lastfm
    describe('/auth/lastfm', function(){});


  });



  after(function(done){
    server.close(() => done());
  });

});




