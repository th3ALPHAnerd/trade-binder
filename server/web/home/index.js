'use strict';

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/',
    handler: {
      file: {
        path: 'public/index.html'
      }
    }
  });


  next();
};


exports.register.attributes = { name: 'web/home' };
