'use strict';

const Joi = require('joi');
const Hoek = require('hoek');
const Async = require('async');
const Config = require('../../config/config');


exports.register = function (server, options, next) {

  options = Hoek.applyToDefaults({ basePath: '' }, options);

  server.route({
    method: 'POST',
    path: options.basePath + '/register',
    config: {
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().email().lowercase().required(),
          username: Joi.string().token().lowercase().required(),
          password: Joi.string().required()
        }
      },
      pre: [{
        assign: 'usernameCheck',
        method: function (request, reply) {
          const User = request.server.plugins['hapi-mongo-models'].User;
          const conditions = { username: request.payload.username };

          User.findOne(conditions, (err, user) => {
            if (err) { return reply(err); }
            if (user) {
              const response = {
                message: 'Username already in use.'
              };

              return reply(response).takeover().code(409);
            }

            reply(true);
          });
        }
      }, {
        assign: 'emailCheck',
        method: function (request, reply) {
          const User = request.server.plugins['hapi-mongo-models'].User;
          const conditions = { email: request.payload.email };

          User.findOne(conditions, (err, user) => {
            if (err) { return reply(err); }
            if (user) {
              var response = {
                message: 'Email already in use.'
              };

              return reply(response).takeover().code(409);
            }

            reply(true);
          });
        }
      }]
    },
    handler: function (request, reply) {
      const Account = request.server.plugins['hapi-mongo-models'].Account;
      const User = request.server.plugins['hapi-mongo-models'].User;
      const Session = request.server.plugins['hapi-mongo-models'].Session;

      Async.auto({
        user: function (done) {
          const username = request.payload.username;
          const password = request.payload.password;
          const email = request.payload.email;

          User.create(username, password, email, done);
        },
        account: ['user', (done, results) => {
          const name = request.payload.name;

          Account.create(name, done);
        }],
        linkUser: ['account', (done, results) => {
          const id = results.account._id.toString();
          const update = {
            $set: {
              user: {
                id: results.user._id.toString(),
                name: results.user.username
              }
            }
          };

          Account.findByIdAndUpdate(id, update, done);
        }],
        linkAccount: ['account', (done, results) => {

          const id = results.user._id.toString();
          const update = {
            $set: {
              roles: {
                account: {
                  id: results.account._id.toString(),
                  name: results.account.name.first + ' ' + results.account.name.last
                }
              }
            }
          };

          User.findByIdAndUpdate(id, update, done);
        }],
        session: ['linkUser', 'linkAccount', (done, results) => {
          Session.create(results.user._id.toString(), done);
        }]
      }, (err, results) => {
        if (err) { return reply(err); }

        const user = results.linkAccount;
        const credentials = user.username + ':' + results.session.key;
        const authHeader = 'Basic ' + new Buffer(credentials).toString('base64');
        const result = {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles
          },
          session: results.session,
          authHeader: authHeader
        };

        request.auth.session.set(result);
        reply(result);
      });
    }
  });

  next();
};


exports.register.attributes = {
  name: 'register'
};
