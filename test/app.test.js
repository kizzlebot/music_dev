/* global describe, it, expect, before, request, assert */


var app = require('../app.js');
var server ;
var cheerio = require('cheerio');




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
    });



    describe('/signup', function(){


      var defaultCredentials = {email:'test@test.com', password:'test'};

      describe('GET', function(){
        it('200 (OK) if not logged in', function(done){
          request(server).get('/signup').expect(200, done);
        });

        it('451 (Redirect) to / if logged in', function(done){
          request(server).get('/signup').expect(451).end((err, res) => {
            expect(res.header['location']).to.include('/');
          })
        });
      })




      describe('POST', function(){

        describe('Failure', function(){
          it('409 (conflict) if email already exists', function(done){
            request(server).post('/signup').send(defaultCredentials).expect(409, done);
          });

          it('409 (conflict) if username already exists', function(done){
            request(server).post('/signup').send(defaultCredentials).expect(409, done);
          });
        })




        describe('Success', function(){
          it('redirects to /', function(done){
            request(server)
              .post('/signup')
              .send(defaultCredentials)
              .end((err, res) => {
                expect(res.header['location']).to.include('/');
              });
          });
        })
      });

    });



    describe('/login', function(){

      describe('GET', function(){
        it('200 (OK) if not logged', function(done){
          request(server).get('/login').expect(200, done);
        });

        it('451 (Redirect) if logged in', function(done){
          request(server).get('/login').expect(451, done);
        });

        // it('should contain csrf as a hidden input field', function(done){
        //   request(server)
        //     .get('/login')
        //     .end(function(err, res){
        //       var $ = cheerio.load(res.text);
        //       var csrf = $('input[name=_csrf]');

        //       assert.isDefined(csrf, 'csrf is defined');
        //       assert.isDefined(csrf.val(), 'csrf value is defined');
        //       done();
        //     });
        // });

        it('should allow log in', function(done){
          request(server)
            .get('/login')
            .end(function(err, res){
              var $ = cheerio.load(res.text);
              var csrf = $('input[name=_csrf]');

              // assert.isDefined(csrf, 'csrf is defined');
              // assert.isDefined(csrf.val(), 'csrf value is defined');

              request(server)
                .post('/login')
                .send({
                  // _csrf:csrf.val(),
                  email:'thrice43@gmail.com',
                  password:'tree444'
                })
                .expect(302, done);
            });
        })
      });

      describe('POST', function(){

      });

    });
  });



  describe('authenticated only', function(){

    describe('/logout', function(){
      describe('GET', function(){
        it('200 (OK)', function(done){
          request(server).get('/logout').expect(200, done);
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




