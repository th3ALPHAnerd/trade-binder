'use strict';

const Joi = require('joi');
const Async = require('async');
const Bcrypt = require('bcrypt');
const ObjectAssign = require('object-assign');
const BaseModel = require('hapi-mongo-models').BaseModel;
const Account = require('./account');


const User = BaseModel.extend({
  constructor: function(attrs) {
    ObjectAssign(this, attrs);

    Object.defineProperty(this, '_roles', {
      writable: true,
      enumerable: false
    });
  },
  hydrateRoles: function(callback) {
    if (!this.roles) {
      this._roles = {};
      return callback(null, this._roles);
    }
    if (this._roles) { return callback(null, this._roles); }

    const self = this;
    const tasks = {};

    if (this.roles.account) {
      tasks.account = function (done) {
        Account.findById(self.roles.account.id, done);
      };
    }

    Async.auto(tasks, (err, results) => {
      if (err) { return callback(err); }

      self._roles = results;
      callback(null, self._roles);
    });
  }
});


User._collection = 'users';


User.schema = Joi.object().keys({
  _id: Joi.object(),
  username: Joi.string().token().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string(),
  roles: Joi.object().keys({
    account: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required()
    })
  }),
  isVerified: Joi.boolean(),
  timeCreated: Joi.date()
});


User.indexes = [
  [{ username: 1 }, { unique: true }],
  [{ email: 1 }, { unique: true }]
];


User.generatePasswordHash = function (password, callback) {
  Async.auto({
    salt: (done) => {
      Bcrypt.genSalt(10, done);
    },
    hash: ['salt', (done, results) => {
      Bcrypt.hash(password, results.salt, done);
    }]
  }, (err, results) => {
    if (err) { return callback(err); }

    callback(null, {
      password: password,
      hash: results.hash
    });
  });
};


User.create = function (username, password, email, callback) {
  const self = this;

  Async.auto({
    passwordHash: this.generatePasswordHash.bind(this, password),
    newUser: ['passwordHash', (done, results) => {
      const document = {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: results.passwordHash.hash,
        isVerified: false,
        timeCreated: new Date()
      };

      self.insertOne(document, done);
    }]
  }, (err, results) => {
    if (err) { return callback(err); }

    results.newUser[0].password = results.passwordHash.password;
    callback(null, results.newUser[0]);
  });
};


User.findByCredentials = function (username, password, callback) {
  const self = this;

  Async.auto({
    user: (done) => {
      const query = {};

      if (username.indexOf('@') > -1) { query.email = username.toLowerCase(); }
      else { query.username = username.toLowerCase(); }

      self.findOne(query, done);
    },
    passwordMatch: ['user', (done, results) => {
      if (!results.user) { return done(null, false); }

      const source = results.user.password;
      Bcrypt.compare(password, source, done);
    }]
  }, (err, results) => {
    if (err) { return callback(err); }
    if (results.passwordMatch) { return callback(null, results.user); }

    callback();
  });
};

User.isVerified = function(username, callback){
    
};

User.findByUsername = function (username, callback) {
  const query = { username: username.toLowerCase() };
  this.findOne(query, callback);
};


module.exports = User;
