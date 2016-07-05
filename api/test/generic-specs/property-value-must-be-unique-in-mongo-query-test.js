"use strict";

var common = require("../common");
var config = common.config;
var assert = common.assert;
common.mockgoose(common.mongoose);

var PropertyValueMustBeUniqueInMongoQuery = require('../../specification/generic-specifications/property-value-must-be-unique-in-mongo-query');
var UserService = require('../../domain/services/users/user-service');
var userService = new UserService();
var mongoPromise = (filter) => {
  return userService.findAll(filter);
};
var target = new PropertyValueMustBeUniqueInMongoQuery("username", mongoPromise, "Teste PropertyValueMustBeUniqueInMongoQuery", 100);
var emailInDatabase = "test@test.com";

describe("property-value-must-be-unique-in-mongo-query-tests", function () {

  before(function (done) {
    common.mongoose.connect(config.db.connectionString, function (mongoError) {

      if (!mongoError) {
        userService.save({ username: emailInDatabase, password: "123456" })
          .then(() => {
            done();
          }, (err) => {
            done(err);
          });
      }
      else {
        done(mongoError);
      }
    });
  });

  it("should satisfy an username not in database", function (done) {
    target.isSatisfiedBy({ username: "another@test.com" })
      .then((result) => {
        assert.equal(result, true);
        done();
      });
  });

  it("should satisfy a null username not in database", function (done) {
    target.isSatisfiedBy({ username: null })
      .then((result) => {
        assert.equal(result, true);
        done();
      });
  });

  it("should satisfy an undefined username not in database", function (done) {
    target.isSatisfiedBy({ username: undefined })
      .then((result) => {
        assert.equal(result, true);
        done();
      });
  });

  it("should satisfy an empty username not in database", function (done) {
    target.isSatisfiedBy({ username: "" })
      .then((result) => {
        assert.equal(result, true);
        done();
      });
  });

  it("should not satisfy an already username in database", function (done) {
    target.isSatisfiedBy({ username: emailInDatabase })
      .then((result) => {
        assert.equal(result, false);
        done();
      }, (err) => {
        done(err);
      });
  });

  after(function (done) {

    common.mongoose.connection.db.dropDatabase(function (err) {

      if (!err) {
        common.mongoose.unmock(function (errOnUnmock) {
          done(errOnUnmock);
        });
      }
      else {
        done(err);
      }
    });
  });
});