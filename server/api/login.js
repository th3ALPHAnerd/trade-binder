'use strict';

const Joi = require('joi');
const Hoek = require('hoek');

exports.register = function (server, options, next) {
  options = Hoek.applyToDefaults({ basePath: '' }, options);


  server.route({
    method: 'POST',
    path: options.basePath + '/login',
    config: {
      validate: {
        payload: {
          username: Joi.string().lowercase().required(),
          password: Joi.string().required()
        }
      },
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      pre: [{
        assign: 'user',
        method: (request, reply) => {
          const User = request.server.plugins['hapi-mongo-models'].User;
          const username = request.payload.username;
          const password = request.payload.password;

          User.findByCredentials(username, password, (err, user) => {
            if (err) { return reply(err); }

            reply(user);
          });
        }
      }, {
        assign: 'token',
        method: (request, reply) => {
          const Token = request.server.plugins.token;

          Token.create(request.pre.user, (err, token) => {
            if (err) { return reply(err); }

            return reply(token);
          });
        }
      }]
    },
    handler: function (request, reply) {
      const token = request.pre.token;

      const result = {
        token: token
      };

      reply(result);
    }
  });


  next();
};


exports.register.attributes = {
  name: 'login',
  version: '1.0.0'
};
