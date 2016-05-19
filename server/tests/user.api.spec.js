/* global describe, it, expect, before, request, assert */
import mongoose from 'mongoose';

import app from '../server';

var path = require('path');
var server = null ;
var csrf ;
var headers = null;





describe('main endpoints', function() {
  beforeEach(function(done) {
    server = app.listen(process.env.port || 4000, done);
  });


  afterEach(function(done) {
    server.close(done);
  });


  //
  describe('GET /', function() {
    it('200 (OK)', function(done) {
      request(app).get('/').expect(200).end(done);
    });

    it('200 (OK) responds with HTML', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          expect(res.headers['content-type']).to.include('text/html');
          done();
        });
    });
  });
  //
  // describe('GET /login', function() {
  //   it('200 (OK)', function(done) {
  //     request(app).get('/login').expect(200).end(done);
  //   });
  //
  //   it('200 (OK) responds with HTML', function(done) {
  //     request(server)
  //       .get('/')
  //       .expect(200)
  //       .end(function(err, res) {
  //         expect(res.headers['content-type']).to.include('text/html');
  //         done();
  //       });
  //   });
  // });

  // describe('GET /login', function(){

  //   it('200 (OK) if not logged in', function(done){
  //     request(server)
  //       .get('/login')
  //       .expect(200, done);
  //   });


  //   it('200 (OK) responds with HTML if not logged in', function(done){
  //     request(server)
  //       .get('/')
  //       .expect(200)
  //       .end(function(err, res){
  //         expect(res.headers['content-type']).to.include('text/html');
  //         done();
  //       })
  //   });


  //   it('200 (OK) and contains csrf', function(done){
  //     request(server)
  //       .get('/login')
  //       .expect(200)
  //       .end((err, res) => {
  //         var $ = cheerio.load(res.text);
  //         var csrf = $('input[name=_csrf]');

  //         assert.isDefined(csrf, 'csrf is defined');
  //         assert.isDefined(csrf.val(), 'csrf value is defined');
  //         done();
  //       })
  //   });


  //   it('should redirect if already logged in', function(done){
  //     // Load page
  //     request(server)
  //       .get('/login')
  //       .end((err, res) => {
  //         var $ = cheerio.load(res.text);

  //         csrf = $('input[name=_csrf]');
  //         // Login
  //         request(server)
  //           .post('/login')
  //           .set('cookie', res.headers['set-cookie'].join(';'))
  //           .send({
  //             email:'thrice43@gmail.com',
  //             password:'tree444',
  //             _csrf:csrf.val()
  //           })
  //           .expect(302)
  //           .end((err, res) => {
  //             // check if redirect
  //             expect(res.header['location']).to.equal('/');
  //             done();
  //           })
  //       });
  //   })
  // })

  // describe('GET /logout', function(){
  //   it('redirects to /', function(done){
  //     request(server)
  //       .get('/logout')
  //       .end((err, res) => {
  //         expect(res.headers.location).to.equal('/');
  //         done();
  //       });
  //   })
  // });

  // describe('GET /signup', function(){
  //   beforeEach(function(done){
  //     request(server)
  //       .get('/login')
  //       .end((err, res) => {
  //         var $ = cheerio.load(res.text);

  //         csrf = $('input[name=_csrf]');
  //         headers = res.headers ;
  //         done();
  //       });
  //   });

  //   it('200 (OK) if not logged in', function(done){
  //     request(server)
  //       .get('/signup')
  //       .expect(200, done);
  //   });



  //   // TODO: not sure if it should be status 200
  //   it('redirect if logged in already', function(done){
  //     // Load page
  //     request(server)
  //       .get('/login')
  //       .end((err, res) => {
  //         var $ = cheerio.load(res.text);

  //         csrf = $('input[name=_csrf]');
  //         // Login
  //         request(server)
  //           .post('/login')
  //           .set('cookie', res.headers['set-cookie'].join(';'))
  //           .send({
  //             email:'thrice43@gmail.com',
  //             password:'tree444',
  //             _csrf:csrf.val()
  //           })
  //           .expect(302)
  //           .end((err, res) => {
  //             // check if redirect
  //             expect(res.header['location']).to.equal('/');
  //             request(server)
  //               .get('/signup')
  //               .set('cookie', res.headers['set-cookie'].join(';'))
  //               .expect(200, done)
  //           })
  //       });
  //   })
  // })






  // describe('POST /login', function(){
  //   beforeEach(function(done){
  //     request(server)
  //       .get('/login')
  //       .end((err, res) => {
  //         var $ = cheerio.load(res.text);

  //         csrf = $('input[name=_csrf]');
  //         headers = res.headers ;
  //         done();
  //       });
  //   });

  //   it('doesn\'t log me in with invalid credentials', function(done){
  //     request(server)
  //       .post('/login')
  //       .set('cookie', headers['set-cookie'].join(';'))
  //       .send({
  //         email:'inva@il.com',
  //         password:'tree444',
  //         _csrf:csrf.val()
  //       })
  //       .expect(assert.isDefined)
  //       .expect(401, done);
  //   });


  //   it('it logs me in if valid credentials', function(done){
  //     request(server)
  //       .post('/login')
  //       .set('cookie', headers['set-cookie'].join(';'))
  //       .send({
  //         email:'thrice43@gmail.com',
  //         password:'tree444',
  //         _csrf:csrf.val()
  //       })
  //       .expect(assert.isDefined)
  //       .expect(302, done);
  //   });
  // });





});
