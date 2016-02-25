'use strict';

const Async = require('async');
const Config = require('../config/config');


exports.register = (server, options, next) => {
  const User = server.plugins['hapi-mongo-models'].User;


  server.auth.strategy('jwt', 'jwt', {
    key: Config.get('/jwtSecret'),
    validateFunc: (decoded, request, callback) => {
      Async.auto({
        user: (done) => {
          User.findById(decoded.user.id, done);
        },
        roles: ['user', (done, results) => {
          if (!results.user) { return done(); }

          results.user.hydrateRoles(done);
        }],
        scope: ['user', (done, results) => {
          if (!results.user || !results.user.roles) { return done(); }

          done(null, Object.keys(results.user.roles));
        }]
      }, (err, results) => {
        if (err) { return callback(err); }

        callback(null, Boolean(results.user), results);
      });
    },
    verifyOptions: { algorithms: [ 'HS256' ] }
  });


  next();
};


exports.register.attributes = {
  name: 'auth',
  version: '1.0.0'
};
