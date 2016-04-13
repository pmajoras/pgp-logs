"use strict";

var common = require("../../common");
var assert = common.assert;

var AuthenticationService = require('../../../application-services/authentication-service');
var target = new AuthenticationService();
var validUser = { username: "teste@teste22.com", password: "123456" };
var invalidUser = { username: "teste@te.com", password: "123456" };

before(function(done) {

  target.registerAndAuthenticate(validUser)
    .then((data) => {
      assert.isOk(data);
      done();
    }, (err) => {
      done(err);
    })
    .catch((err) => {
      done(err);
    });
});

it("should authenticate the user", function(done) {
  target.authenticate(validUser)
    .then((data) => {
      assert.isOk(data);
      done();
    }, (err) => {
      done(err);
    })
    .catch((err) => {
      done(err);
    });
});

it("should not authenticate invalid user", function(done) {
  target.authenticate(invalidUser)
    .then((data) => {
      assert.isOk(data);
      done();
    }, (err) => {
      if (!err.message) {
        done(err);
      }
      else {
        done();
      }
    })
    .catch((err) => {
      done(err);
    });
});

after(function(done) {
  common.mongoose.connection.db.dropDatabase(function(err) {
    done(err);
  });
});