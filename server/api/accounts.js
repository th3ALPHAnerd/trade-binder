'use strict';
        
const Joi = require('joi');
const Async = require('async');
//const privateInfo = require('./private');
const jwt = require('jsonwebtoken');
const mailer = require('../lib/mailer.js');
const Config = require('../config/config');
const User = require('../models/user');


exports.login = {
    description: 'Logs the user into there account',
    notes: 'Returns an access token',
    tags: ['api'],
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
                if (!user) {
                    const response = 'Invalid username and/or password.';
                    return reply(response).takeover().code(409);
                }
                console.log('user is verified: ' + user.emailVerified);
                if (!user.emailVerified){
                    const response = 'Your email has not been verified';
                    return reply(response).takeover().code(401);
                }

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
    }],
    handler: (request, reply) => {
        reply({ token: request.pre.token });
    }
};

exports.register = {
        description: 'Registers the user with the app',
        notes: 'Returns an access token',
        tags: ['api'],
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
        pre: [
            //usernameCheck and emailCheck excuted in parallel
        {
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
        }],
        handler: (request, reply) => {
            const Account = request.server.plugins['hapi-mongo-models'].Account;
            const User = request.server.plugins['hapi-mongo-models'].User;
            const Token = request.server.plugins.token;   
            //console.log('Token: ' + Config.get('/jwtSecret'));

            Async.auto({
                user: (done) => {
                    const username = request.payload.username;
                    const password = request.payload.password;
                    const email = request.payload.email;
                    User.create(username, password, email, done);
                    
                    var tokenData = {
                        username: User.name,
                        id: User._id
                    };
                    
                    var user = {
                        name: username,
                        email: email
                    };
                    
                    var key = Config.get('/jwtSecret');
                    console.log('key: ' +key);
                    
                   
                    var jwtToken = jwt.sign(tokenData, key);

                    console.log('send email');
                    console.log('email: ' + user.email);
                    console.log('name: '+ user.name);
                    mailer.sendEmailVerificationLink(user, jwtToken);
                    
                    
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
                }]//,
                //token: ['linkUser', 'linkAccount', (done, results) => {
                //    Token.create(results.linkAccount, done);
                //}]
            }, (err, results) => {
                if (err) { return reply(err); }

                reply({
                    statusCode: 201,
                    objectId: User._id,
  //sessionToken: JwtAuth.createToken({ id: User._id})
                });
            });
        }
};

exports.verifyEmail = {
    description: 'Verify the user email address',
    notes: 'Returns an access token',
    tags: ['api'],
    handler: (request, reply) => {
        console.log('verifying Email');
        console.log(request.params.token);
        var token = request.params.token;
        
        var key = Config.get('/jwtSecret');
        var decoded = jwt.verify(token, key);
        
        jwt.verify(request.params.token, Config.get('/jwtSecret'), function(err,decoded){
            if(decoded === undefined){
                return reply(Boom.forbidden("invalid verificaiton link"));
            }
            
            User.findById(decoded.id, function(err, user){


            if (err) {
        return reply(Boom.badImplementation(err));
      }
      
      if (user === null) {
        return reply(Boom.forbidden("invalid verification link"));
      }

      if (user.isVerified === true) {
        return reply(Boom.forbidden("account is already verified"));
      }

      user.emailVerified = true;
      
      //new a user.update/save function
      user.save(function(err){
        if (err) {
          return reply(Boom.badImplementation(err));
        }
        return reply("account sucessfully verified");
      });
    })
    
  });
}
}