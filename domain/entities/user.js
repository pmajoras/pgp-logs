"use strict";
// Must load board because the 'ref Board' has a dependency to Board entity.
require('./board');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true }
}));