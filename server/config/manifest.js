'use strict';

const Confidence = require('confidence');
const Config = require('./config');


const criteria = { env: process.env.NODE_ENV };
const manifest = {
  $meta: 'Conifiguration for the server',
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
  registrations: [
    { plugin: { register: 'inert', options: {} } },
    // { plugin: { register: 'hapi-auth-basic', options: {} } },
    { plugin: { register: 'hapi-auth-jwt2', options: {}, } },
    { plugin: { register: 'good', options: {
      reporters: [{
        opsInterval: 1000,
        reporter: require('good-console'),
        events: { error: '*', log: '*', response: '*' }
      }, {
        reporter: require('good-file'),
        events: { ops: '*', error: '*' },
        config: { path: './server/logs/server-log', rotate: 'daily' }
      } ]
    } } },
    { plugin: { register: 'hapi-mongo-models', options: {
      mongodb: Config.get('/hapiMongoModels/mongodb'),
      models: { Account: './server/models/account',
        User: './server/models/user' },
        autoIndex: Config.get('/hapiMongoModels/autoIndex') },
    } },
    { plugin: { register: './auth/auth', options: {}, } },
    { plugin: { register: './auth/token', options: {}, } },
    { plugin: { register: './api/login', options: { basePath: '/api' }, } },
    { plugin: { register: './api/register', options: { basePath: '/api' }, } },
    { plugin: { register: './api/secure', options: { basePath: '/api' }, } },
    { plugin: { register: './web/public', options: {}, } },
    { plugin: { register: './web/home', options: {}, } },
  ]
};


const store = new Confidence.Store(manifest);

exports.get = function (key) { return store.get(key, criteria); };
exports.meta = function (key) { return store.meta(key, criteria); };
