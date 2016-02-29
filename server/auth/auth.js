'use strict';

const Async = require('async');
const Config = require('../config/config');


exports.register = (server, options, next) => {
  const User = server.plugins['hapi-mongo-models'].User;


  server.auth.strategy('jwt', 'jwt', {
    key: Config.get('/jwtSecret'),
    verifyOptions: { algorithms: [ 'HS256' ] },
    validateFunc: (decoded, request, callback) => {
      callback(null, true, decoded.user);
    }
  });


  next();
};


exports.register.attributes = {
  name: 'auth',
  version: '1.0.0'
};
