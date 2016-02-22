'use strict';

const Config = require('./config');
const Jwt = require('jsonwebtoken');


exports.register = (server, options, next) => {
  const SignJwt = {};


  SignJwt.sign = function (request, callback) {
    const payload = {
      id: request.id,
      scope: request.scope
    };
    const options = {
      issuer: 'trade-binder',
      expiresIn: '24h'
    };

    return callback(Jwt.sign(payload, Config.get('/jwtSecret'), options));
  };


  next();
};


exports.register.attributes = {
  name: 'signJwt',
  version: '1.0.0'
};
