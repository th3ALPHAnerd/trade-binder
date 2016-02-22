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
    { plugin: { register: 'hapi-auth-basic', options: {} } },
    { plugin: { register: 'hapi-auth-cookie', options: {}, } },
    { plugin: { register: 'good', options: {
      reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './server/logs/server-log'
      } ]
    } } },
    { plugin: { register: 'hapi-mongo-models', options: {
      mongodb: Config.get('/hapiMongoModels/mongodb'),
      models: { Account: './server/models/account',
        Session: './server/models/session',
        User: './server/models/user' },
        autoIndex: Config.get('/hapiMongoModels/autoIndex') }, } },
        { plugin: { register: './server/auth', options: {}, } },
        { plugin: { register: './server/api/login', options: { basePath: '/api' }, } },
        { plugin: { register: './server/api/logout', options: { basePath: '/api' }, } },
        { plugin: { register: './server/api/register', options: { basePath: '/api' }, } },
        { plugin: { register: './server/web/public', options: {}, } },
        { plugin: { register: './server/web/home', options: {}, } },
  ]
};


const store = new Confidence.Store(manifest);

exports.get = function (key) { return store.get(key, criteria); };
exports.meta = function (key) { return store.meta(key, criteria); };
