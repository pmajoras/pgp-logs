"use strict";

var common = require("../../../common");
var assert = common.assert;
var AuthenticationService = require('../../../../application-services/authentication-service');
var UserService = require('../../../../domain/services/users/user-service');

var userService = new UserService();
var databaseUser = { username: "teste@teste22.com", password: "123456" };

var UserMustExistSpec = require('../../../../application-services/specifications/authentication-service-specs/user-must-exist-spec');
var target = new UserMustExistSpec(userService);

before(function(done) {

  userService.save(databaseUser)
    .then((data) => {
      assert.isOk(data);
      done();
    }, (err) => {
      done(err);
    });
});

it("should be satisfied with database user", function(done) {

  target.isSatisfiedBy(databaseUser)
    .then((result) => {
      assert.isOk(result);
      done();
    }, (err) => {
      done(err);
    });
});

it("should not be satisfied with null param", function(done) {

  target.isSatisfiedBy(null)
    .then((data) => {
      done("Could not be satisfied when the param is null.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

it("should not be satisfied with undefined param", function(done) {
  target.isSatisfiedBy(undefined)
    .then(() => {
      done("Could not be satisfied when the param is undefined.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

it("should not be satisfied with no username user", function(done) {
  target.isSatisfiedBy({ password: "123456" })
    .then(() => {
      done("Could not be satisfied when the param is an user without username.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

it("should not be satisfied with no password user", function(done) {
  target.isSatisfiedBy({ username: "123456" })
    .then(() => {
      done("Could not be satisfied when the param is an user without password.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

it("should not be satisfied with invalid user", function(done) {
  target.isSatisfiedBy({ username: "testeinvalido@teste.com", password: "123456" })
    .then(() => {
      done("Could not be satisfied when the param is an invalid user.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

after(function(done) {
  common.mongoose.connection.db.dropDatabase(function(err) {
    done(err);
  });
});