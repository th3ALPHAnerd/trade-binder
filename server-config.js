'use strict';

const Confidence = require('confidence');

const criteria = { env: process.env.NODE_ENV };
const config = {
  projectName: '{{projectName}}',
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
    // production: 'Not yet determined',
    $default: 'http://127.0.0.1:8000'
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
        url: '{{mongodbUrl}}-test'
      },
      autoIndex: true
    },
    $default: {
      mongodb: {
        url: '{{mongodbUrl}}'
      },
      autoIndex: true
    }
  },
};

const store = new Confidence.Store(config);

exports.get = function (key) { return store.get(key, criteria); };
exports.meta = function (key) { return store.meta(key, criteria); };
