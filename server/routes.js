'use strict';

const Hoek = require('hoek');
const Auth = require('./api/auth');
const Secure = require('./api/secure');
const Static = require('./web/public');


exports.register = function (server, options, next) {
  options = Hoek.applyToDefaults({ basePath: '' }, options);

  server.route({ method: 'GET',   path: '/{somethings*}',                       config: Static.get });
  server.route({ method: 'POST',  path: options.basePath +'/auth/login',         config: Auth.login });
  server.route({ method: 'POST',  path: options.basePath +'/auth/register',      config: Auth.register });
  server.route({ method: 'GET',   path: options.basePath +'/secure',             config: Secure.secure });


  next();

};

exports.register.attributes = { name: 'routes' };
