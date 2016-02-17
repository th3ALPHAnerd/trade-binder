'use strict';

const Hoek = require('hoek');


exports.register = function (server, options, next) {
  options = Hoek.applyToDefaults({ basePath: '' }, options);


  server.route({
    method: 'GET',
    path: options.basePath + '/',
    handler: function (request, reply) {

      reply({ message: 'Welcome...' });
    }
  });


  next();
};


exports.register.attributes = {
  name: 'home'
};
