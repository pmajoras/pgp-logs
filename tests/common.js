"use strict";

var assert = require('chai').assert;
var mongoose = require('mongoose');
var config = require('../config/config');
var mockgoose = require('mockgoose');

exports.mongoose = mongoose;
exports.assert = assert;
exports.config = config;
exports.mockgoose = mockgoose;

exports.importTest = function (name, path) {
  describe(name, function () {
    require(path);
  });
};
