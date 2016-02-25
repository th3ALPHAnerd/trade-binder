'use strict';

const Confidence = require('confidence');

const criteria = { env: process.env.NODE_ENV };
const config = {
  $meta: 'Configuration for the server',
  projectName: 'trade-binder',
  port: {
    web: {
      $filter: 'env',
      test: 9000,
      production: process.env.PORT,
      $default: 8000
    }
  },
  baseUrl: {
    $filter: 'env',
    $meta: 'values should not end in "/"',
    production: '', //not yet implemented
    $default: 'http://127.0.0.1:8000'
  },
  jwtSecret: {
    $filter: 'env',
    production: process.env.COOKIE_SECRET,
    $default: 'kO71gSDB3sJZdwJYy8N2MGTkyonM5dohTpEBWvjPqmu0mDYlMQjU5d5OyZEM4CR'
  },
  hapiMongoModels: {
    $filter: 'env',
    production: {
      mongodb: {
        url: process.env.MONGOLAB_URI
      },
      autoIndex: false
    },
    test: {
      mongodb: {
        url: 'mongodb://localhost:27017/trade-binder-test'
      },
      autoIndex: true
    },
    $default: {
      mongodb: {
        url: 'mongodb://localhost:27017/trade-binder'
      },
      autoIndex: true
    }
  }
};


const store = new Confidence.Store(config);

exports.get = function (key) { return store.get(key, criteria); };
exports.meta = function (key) { return store.meta(key, criteria); };
