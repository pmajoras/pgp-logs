"use strict";

var common = require("../common");
var assert = common.assert;

var PropertyMustBeAnEmailSpec = require('../../specification/generic-specifications/property-must-be-an-email-spec');
var target = new PropertyMustBeAnEmailSpec("email", "Teste PropertyMustBeAnEmailSpec", 100);
var validEmail = "test@test.com";
var invalidEmail = "teste.com";
var anotherInvalidEmail = "teste";

before(function() {
});

it("should satisfy a valid email", function(done) {
  target.isSatisfiedBy({ email: validEmail })
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should not satisfy an invalid email", function(done) {
  target.isSatisfiedBy({ email: invalidEmail })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy another invalid email", function(done) {
  target.isSatisfiedBy({ email: anotherInvalidEmail })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an empty email", function(done) {
  target.isSatisfiedBy({ email: "" })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy an undefined email", function(done) {
  target.isSatisfiedBy({ email: undefined })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy a null email", function(done) {
  target.isSatisfiedBy({ email: null })
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy a JSON with wrong property name", function(done) {
  target.isSatisfiedBy({ emailTest: validEmail })
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

after(function() {
});