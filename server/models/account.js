'use strict';

const Joi = require('joi');
const ObjectAssign = require('object-assign');
const BaseModel = require('hapi-mongo-models').BaseModel;


const Account = BaseModel.extend({
  constructor: function (attrs) {

    ObjectAssign(this, attrs);
  }
});


Account._collection = 'accounts';


Account.schema = Joi.object().keys({
  _id: Joi.object(),
  user: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().lowercase().required()
  }),
  name: Joi.object().keys({
    first: Joi.string().required(),
    middle: Joi.string().allow(''),
    last: Joi.string().allow('')
  }),
  timeCreated: Joi.date()
});


Account.indexes = [
  [{ 'user.id': 1 }],
  [{ 'user.name': 1 }]
];


Account.create = function (name, callback) {
  const nameParts = name.trim().split(/\s/);

  const document = {
    name: {
      first: nameParts.shift(),
      middle: nameParts.length > 1 ? nameParts.shift() : '',
      last: nameParts ? nameParts.join(' ') : ''
    },
    timeCreated: new Date()
  };

  this.insertOne(document, (err, docs) => {

    if (err) {
      return callback(err);
    }

    callback(null, docs[0]);
  });
};


Account.findByUsername = function (username, callback) {

  const query = { 'user.name': username.toLowerCase() };
  this.findOne(query, callback);
};


module.exports = Account;
