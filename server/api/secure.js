'use strict';

const Hoek = require('hoek');


exports.register = function (server, options, next) {
  options = Hoek.applyToDefaults({ basePath: '' }, options);


  server.route({
    method: 'get',
    path: options.basePath + '/secure',
    config: {
      auth: {
        mode: 'required',
        strategy: 'jwt'
      }
    },
    handler: (request, reply) => {
        reply({ message: 'You are secure.' });
    }
  });


  next();
};


exports.register.attributes = {
  name: 'secure',
  version: '1.0.0'
};
