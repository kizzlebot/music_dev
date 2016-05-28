'use strict';

const internals = module.exports = {};

internals.register = function (server, options, next) {
  var api = server.select('api');

  api.log(['plugin', require(`${process.cwd()}/package.json`).name], 'successfully registered.');



  // console.log(api.registrations.music_dev);
  api.decorate('reply', 'lookup', function(message){
    // TODO: replace with react.renderToString
    this.response({message:message});
  })


  api.route({
    method: 'GET',
    path:'/',
    handler: function(require, reply){
      reply.lookup('hehe')
    }
  })


  return next();
};



internals.register.attributes = {
  pkg: require(`${process.cwd()}/package`),
  testMode: false
};
