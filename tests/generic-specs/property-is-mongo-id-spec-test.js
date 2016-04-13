"use strict";

var common = require("../common");
var assert = common.assert;
var mongoose = require('mongoose');

var validMongoId = new mongoose.Types.ObjectId().toString();
var PropertyIsMongoIdSpec = require('../../specification/generic-specifications/property-is-mongo-id-spec');
var target = new PropertyIsMongoIdSpec("_id", "Teste PropertyIsMongoIdSpec", 100);

before(function() {
});

it("should satisfy a valid mongo id", function(done) {
  target.isSatisfiedBy({ _id: validMongoId })
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should not satisfy a valid mongo id in a diferent property", function(done) {
  target.isSatisfiedBy({ otherProperty: validMongoId })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy a null object", function(done) {
  target.isSatisfiedBy(null)
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an empty JSON", function(done) {
  target.isSatisfiedBy({})
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

after(function() {
});