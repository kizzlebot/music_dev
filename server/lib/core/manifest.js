'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    app:{ slogan: 'FlexShopper saved my life' },
    debug: {
      request: ['error']
    },

    connections: {
      routes: { security: true }
    }
  },
  connections: [{
    host: Config.get('/host/api'),
    port: Config.get('/port/api'),
    labels: ['api']
  }],
  registrations: {
    $filter: 'env',
    $base: [
      { plugin: 'blipp', options: {select:['api']} },
      { plugin: 'inert', options: {select:['api']} },
      { plugin: 'vision', options: {select:['api']} },
      { plugin: 'hapi-swagger', options: {select:['api']}},
      { plugin: 'hapi-info', options:{select:['api']} },
      {
        plugin: {
          register: 'good',
          options: {
            ops: { interval: 5000 },
            reporters: Config.get('/good/reporters')
          }
        }
      },
    ],

    // If in test mode, pass it as a option key to register function
    test: [{
      plugin: {
        register:`${process.cwd()}/server/lib/plugin`,
        options: { testMode: true }
      },
      options: {
        select:['api'],
        routes:{
          prefix:'/api'
       }
      }
    }],

    // If not in test mode
    $default: [{
      plugin: {
        register:`${process.cwd()}/server/lib/plugin`,
        options: { testMode: false }
      },
      options: {
        select:['api'],
        prefix:'/api'
      }
    }]
  }
};





const store = new Confidence.Store(manifest);

exports.get = function (key) {

  return store.get(key, criteria);
};

exports.meta = function (key) {

  return store.meta(key, criteria);
};
