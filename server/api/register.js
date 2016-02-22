'use strict';

const Joi = require('joi');
const Hoek = require('hoek');
const Async = require('async');


exports.register = function (server, options, next) {

  options = Hoek.applyToDefaults({ basePath: '' }, options);

  server.route({
    method: 'POST',
    path: options.basePath + '/register',
    config: {
      auth: {
        mode: 'try',
        strategy: 'jwt'
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
        method: (request, reply) => {
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
        method: (request, reply) => {
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
    handler: (request, reply) => {
      const Account = request.server.plugins['hapi-mongo-models'].Account;
      const User = request.server.plugins['hapi-mongo-models'].User;
      const Token = request.server.plugins.token;

      Async.auto({
        user: (done) => {
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
        token: ['linkUser', 'linkAccount', (done, results) => {
          Token.create(results.linkAccount, done);
        }]
      }, (err, results) => {
        if (err) { return reply(err); }
        const result = { token: results.token };

        reply(result);
      });
    }
  });

  next();
};


exports.register.attributes = {
  name: 'register',
  version: '1.0.0'
};
