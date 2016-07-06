'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Application', new Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  appId: { type: String, unique: true, required: true, dropDups: true },
  logPattern: [{ type: String, required: true }],
  isActive: { type: Boolean, required: true, default: true },
  isAvailable: { type: Boolean, required: true, default: true },
  description: { type: String, required: false }
}));
