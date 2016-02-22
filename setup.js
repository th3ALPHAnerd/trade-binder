#!/usr/bin/env node

'use strict';

const Fs = require('fs');
const Path = require('path');
const Async = require('async');
const Promptly = require('promptly');
const Mongodb = require('mongodb');
const Handlebars = require('handlebars');


const configTemplatePath = Path.resolve(__dirname, './config/server-config.js');
const configPath = Path.resolve(__dirname, './config/config.js');


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
  createConfig: ['testMongo', (done, results) => {
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
}, (err, results) => {
  if (err) {
    console.error('Setup failed.');
    console.error(err);
    return process.exit(1);
  }

  console.log('Setup complete.');
  process.exit(0);
});
