#!/usr/bin/env node

'use strict';

const Fs = require('fs');
const Path = require('path');
const Async = require('async');
const Promptly = require('promptly');
const Mongodb = require('mongodb');
const Handlebars = require('handlebars');


const configTemplatePath = Path.resolve(__dirname, './server/config/server-config.js');
const configPath = Path.resolve(__dirname, './server/config/config.js');


if (process.env.NODE_ENV === 'test') {
  const options = { encoding: 'utf-8' };
  const source = Fs.readFileSync(configTemplatePath, options);
  const configTemplate = Handlebars.compile(source);
  const context = {
    projectName: 'trade-binder',
    mongodbUrl: 'mongodb://localhost:27017/trade-binder',
  };
  Fs.writeFileSync(configPath, configTemplate(context));
  console.log('Setup complete.');
  process.exit(0);
}


Async.auto({
  projectName: function (done) {
    Promptly.prompt('Project name: (trade-binder)', { default: 'trade-binder' }, done);
  },
  mongodbUrl: ['projectName', (done, results) => {
    const promptOptions = { default: 'mongodb://localhost:27017/trade-binder' };

    Promptly.prompt('MongoDB URL: (mongodb://localhost:27017/trade-binder)', promptOptions, done);
  }],
  rootEmail: ['mongodbUrl', (done, results) => {
    Promptly.prompt('Root user email: root@root', { default: 'root@root' }, done);
  }],
  rootPassword: ['rootEmail', (done, results) => {
    Promptly.password('Root user password: root', { default: 'root' }, done);
  }],
  testMongo: ['mongodbUrl', (done, results) => {
    Mongodb.MongoClient.connect(results.mongodbUrl, {}, (err, db) => {
      if (err) {
        console.error('Failed to connect to Mongodb.');
        return done(err);
      }

      db.close();
      done(null, true);
    });
  }],
  createConfig: ['testMongo', 'rootEmail', 'rootPassword', (done, results) => {
    const fsOptions = { encoding: 'utf-8' };
    Fs.readFile(configTemplatePath, fsOptions, (err, src) => {
      if (err) {
        console.error('Failed to read config template.');
        return done(err);
      }

      const configTemplate = Handlebars.compile(src);
      Fs.writeFile(configPath, configTemplate(results), done);
    });
  }],
  setupRootUser: ['createConfig', (done, results) => {
    const BaseModel = require('hapi-mongo-models').BaseModel;
    const User = require('./server/models/user');
    const Account = require('./server/models/account');

    Async.auto({
      connect: (done) => {
        BaseModel.connect({ url: results.mongodbUrl }, done);
      },
      clean: ['connect', (done) => {
        Async.parallel([
          User.deleteMany.bind(User, {}),
          Account.deleteMany.bind(Account, {})
        ], done);
      }],
      account: ['clean', (done) => {
        Account.create('Mister Admin', done);
      }],
      user: ['clean', (done, dbResults) => {
        User.create('root', results.rootPassword, results.rootEmail, done);
      }],
      linkAccount: ['account', 'user', (done, dbResults) => {
        var id = dbResults.user._id.toString();
        var update = {
          $set: {
            'account': {
              id: dbResults.account._id.toString(),
              name: 'Mister Admin'
            }
          }
        };

        User.findByIdAndUpdate(id, update, done);
      }],
      linkUser: ['account', 'user', (done, dbResults) => {
        const id = dbResults.account._id.toString();
        const update = {
          $set: {
            user: {
              id: dbResults.user._id.toString(),
              name: 'root'
            }
          }
        };

        Account.findByIdAndUpdate(id, update, done);
      }]
    }, (err, dbResults) => {
      if (err) {
        console.error('Failed to setup root user.');
        return done(err);
      }

      done(null, true);
    });
  }]
}, (err, results) => {
  if (err) {
    console.error('Setup failed.');
    console.error(err);
    return process.exit(1);
  }

  console.log('Setup complete.');
  process.exit(0);
});
