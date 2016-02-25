'use strict';

const Jwt = require('jsonwebtoken');
const Config = require('../config/config');


const create = function (user, callback) {
  const payload = {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles
    }
  };
  const options = {
    issuer: 'trade-binder',
    expiresIn: '24h'
  };

  return callback(null, Jwt.sign(payload, Config.get('/jwtSecret'), options));
};


exports.register = (server, options, next) => {
  server.expose('create', create);


  next();
};


exports.register.attributes = {
  name: 'token',
  version: '1.0.0'
};
