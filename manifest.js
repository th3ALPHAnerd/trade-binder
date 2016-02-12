'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: Config.get('/port/web'),
    labels: ['web']
  }],
  plugins: {
    'hapi-mongo-models': {
      mongodb: Config.get('/hapiMongoModels/mongodb'),
      models: {
        Account: './server/models/account',
        Session: './server/models/session',
        User: './server/models/user'
      },
      autoIndex: Config.get('/hapiMongoModels/autoIndex')
    },
    './server/auth': {},
    './server/api/accounts': { basePath: '/api' },
    './server/api/index': { basePath: '/api' },
    './server/api/login': { basePath: '/api' },
    './server/api/logout': { basePath: '/api' },
    './server/api/sessions': { basePath: '/api' },
    './server/api/register': { basePath: '/api' },
    './server/api/users': { basePath: '/api' }
  }
};

const store = new Confidence.Store(manifest);

exports.get = function (key) {
  return store.get(key, criteria);
};

exports.meta = function (key) {
  return store.meta(key, criteria);
};
