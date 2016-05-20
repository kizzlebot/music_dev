/* eslint-disable */

import mocha from 'mocha';
import app from '../server';

import mongoose from 'mongoose';
import Post from '../models/post';

var serverConfig = require('../config');



function connectDB(done) {
  if (mongoose.connection.name !== 'music_dev_test') return done();
  mongoose.connect(serverConfig.mongoURL, function(err) {
    if (err) return done(err);
    done();
  });
}

function dropDB(done) {
  if (mongoose.connection.name !== 'music_dev_test') return done();
  mongoose.connection.db.dropDatabase(function(err) {
    mongoose.connection.close(done);
  });
}







var server ;
var port = process.env.PORT || 8000;



describe('Posts HTTP API Requests', function() {

  before('start expressjs server', function(done) {
    server = app.listen(port, (err) => (!err) ? done() : done(err));
  });

  after('close the server', function(done) {
    server.close(done);
  });




  describe('GET /api/posts/getPosts', function() {
    beforeEach('connect and add two post entries', function(done) {
      connectDB(function() {
        var post1 = new Post({name: 'Prashant', title: 'Hello Mern', content: "All cats meow 'mern!'"});
        var post2 = new Post({name: 'Mayank', title: 'Hi Mern', content: "All dogs bark 'mern!'"});

        Post.create([post1, post2], function(err, saved) {
          done();
        });
      });
    });

    afterEach(function(done) {
      dropDB(done);
    });





    it('Should correctly give number of Posts', function(done) {
      request(app)
        .get('/api/posts/getPosts')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          Post.find().exec(function(err, posts) {
            expect(posts.length).to.equal(res.body.posts.length);
            done();
          });
        });
    });
  });






  describe('GET /api/posts/getPost', function() {
    beforeEach('connect and add one Post entry', function(done) {
      connectDB(function() {
        var post = new Post({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });

        post.save(function(err, saved) {
          done();
        });
      });
    });

    afterEach(function(done) {
      dropDB(done);
    });





    it('Should send correct data when queried against a title', function(done) {
      request(app)
        .get('/api/posts/getPost?slug=bar-f34gb2bh24b24b2')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          Post.findOne({ cuid: 'f34gb2bh24b24b2' }).exec(function(err, post) {
            expect(post.name).to.equal('Foo');
            done();
          });
        });
    });

  });


  describe('POST /api/posts/addPost', function() {
    beforeEach('connect and add a post', function(done) {
      connectDB(function() {
        done();
      });
    });

    afterEach(function(done) {
      dropDB(done);
    });

    it('Should send correctly add a post', function(done) {

      request(app)
        .post('/api/posts/addPost')
        .send({ post: { name: 'Foo', title: 'bar', content: 'Hello Mern says Foo' } })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          Post.findOne({ title: 'bar' }).exec(function(err, post) {
            expect(post.name).to.equal('Foo');
            done();
          });
        });
    });

  });









  describe('POST /api/posts/deletePost', function() {
    var postId;

    beforeEach('connect and add one Post entry', function(done) {

      connectDB(function() {
        var post = new Post({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });

        post.save(function(err, saved) {
          postId = saved._id;
          done();
        });
      });
    });

    afterEach(function(done) {
      dropDB(done);
    });

    it('Should connect and delete a post', function(done) {

      // Check if post is saved in DB
      Post.findById(postId).exec(function(err, post) {
        expect(post.name).to.equal('Foo');
      });

      request(app)
        .post('/api/posts/deletePost')
        .send({ postId: postId})
        .set('Accept', 'application/json')
        .end(function() {

          // Check if post is removed from DB
          Post.findById(postId).exec(function(err, post) {
            expect(post).to.equal(null);
            done();
          });
        });
    });
  });

});
