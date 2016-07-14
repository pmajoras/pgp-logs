'use strict';

var chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);

var assert = chai.assert;
var expect = chai.expect;
var mongoose = require('mongoose');
var config = require('../config/config');
var mockgoose = require('mockgoose');

var chai = require('chai')
  , spies = require('chai-spies');

chai.use(spies);

exports.mongoose = mongoose;
exports.assert = assert;
exports.spy = chai.spy;
exports.expect = expect;
exports.config = config;
exports.mockgoose = mockgoose;
