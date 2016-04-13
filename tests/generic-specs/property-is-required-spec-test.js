"use strict";

var common = require("../common");
var assert = common.assert;

var PropertyIsRequiredSpec = require('../../specification/generic-specifications/property-is-required-spec');
var target = new PropertyIsRequiredSpec("name", "Teste PropertyIsRequiredSpec", 100);

before(function() {
});

it("should satisfy an object with name", function(done) {
  target.isSatisfiedBy({ name: "123" })
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should satisfy an object with name 2", function(done) {
  target.isSatisfiedBy({ name: "abcdefgh" })
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should satisfy an object with white space name", function(done) {
  target.isSatisfiedBy({ name: " " })
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should not satisfy an object with empty name", function(done) {
  target.isSatisfiedBy({ name: "" })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an object with null name", function(done) {
  target.isSatisfiedBy({ name: null })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an object with undefined name", function(done) {
  target.isSatisfiedBy({ name: undefined })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an empty JSON object", function(done) {
  target.isSatisfiedBy({})
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

it("should not satisfy an undefined object", function(done) {
  target.isSatisfiedBy(undefined)
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an object with wrong property name", function(done) {
  target.isSatisfiedBy({ name1: "123" })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

after(function() {
});