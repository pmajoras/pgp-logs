"use strict";

var common = require("../../../common");
var assert = common.assert;

var PasswordMustHaveSixOrMoreCharsSpec = require('../../../../domain/services/users/specs/password-must-have-six-or-more-chars-spec');
var target = new PasswordMustHaveSixOrMoreCharsSpec();
var validUser = { username: "teste@teste22.com", password: "123456" };
var invalidUser = { username: "teste@te.com", password: "1234" };
var invalidUserWithValidPassword = { username: "teste@te.com", password: "1234567" };

before(function() {
});

it("should satisfy the user password", function(done) {
  target.isSatisfiedBy(validUser)
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should satisfy the user password even with no username", function(done) {
  target.isSatisfiedBy(invalidUserWithValidPassword)
    .then((result) => {
      assert.equal(result, true);
      done();
    });
});

it("should not satisfy the user invalid password", function(done) {
  target.isSatisfiedBy(invalidUser)
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy a null user", function(done) {
  target.isSatisfiedBy(null)
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

it("should not satisfy a undefined user", function(done) {
  target.isSatisfiedBy(undefined)
    .then((result) => {
      assert.equal(result, false);
      done();
    });
});

after(function() {
});