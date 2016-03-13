'use strict';

const Hoek = require('hoek');
const Accounts = require('./api/accounts');
const Secure = require('./api/secure');
const Static = require('./web/public');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({basePath: ''}, options);
    
    server.route({method: 'GET', path: '/{somethingss*}', config: Static.get});
    server.route({method: 'POST', path: options.basePath + '/accounts/login', config: Accounts.login});
    server.route({method: 'POST', path: options.basePath + '/accounts/register', config: Accounts.register});
    server.route({method: 'POST', path: options.basePath + '/accounts/refresh', config: Accounts.refresh});
    server.route({method: 'GET', path: options.basePath + '/accounts/verifyEmail/{token}', config: Accounts.verifyEmail});
    server.route({method: 'GET', path: options.basePath + '/secure', config: Secure.secure});

    next();

};

exports.register.attributes = {name: 'routes'};
