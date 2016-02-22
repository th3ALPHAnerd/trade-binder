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
      // plugins: {
      //   'hapi-auth-cookie': {
      //     redirectTo: false
      //   }
      // },
      // auth: {
      //   mode: 'try',
      //   strategy: 'session'
      // },
      pre: [{
        assign: 'user',
        method: function (request, reply) {
          const User = request.server.plugins['hapi-mongo-models'].User;
          const username = request.payload.username;
          const password = request.payload.password;

          User.findByCredentials(username, password, (err, user) => {
            if (err) { return reply(err); }

            reply(user);
          });
        }
      }, {
        assign: 'session',
        method: function (request, reply) {
          const Session = request.server.plugins['hapi-mongo-models'].Session;

          Session.create(request.pre.user._id.toString(), (err, session) => {
            if (err) { return reply(err); }

            return reply(session);
          });
        }
      }]
    },
    handler: function (request, reply) {
      const credentials = request.pre.session._id.toString() + ':' + request.pre.session.key;
      const authHeader = 'Basic ' + new Buffer(credentials).toString('base64');

      const result = {
        user: {
          _id: request.pre.user._id,
          username: request.pre.user.username,
          email: request.pre.user.email,
          roles: request.pre.user.roles
        },
        session: request.pre.session,
        authHeader: authHeader
      };

      request.auth.session.set(result);
      reply(result);
    }
  });


  next();
};


exports.register.attributes = {
  name: 'login'
};
