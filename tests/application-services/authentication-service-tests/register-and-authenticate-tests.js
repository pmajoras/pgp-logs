"use strict";

var common = require("../../common");
var assert = common.assert;

var AuthenticationService = require('../../../application-services/authentication-service');
var target = new AuthenticationService();

before(function() {
});

it("should register and authenticate the user", function(done) {
  
  target.registerAndAuthenticate({ username: "teste@teste22.com", password: "123456" })
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

it("should not register and authenticate the same user", function(done) {
  target.registerAndAuthenticate({ username: "teste@teste22.com", password: "123456" })
    .then(() => {
      done({ message: "The user was registered and authenticated, when it should not." });
    }, (err) => {
      if (err && err.type === 'Specification') {
        done();
      }
      else {
        done(err);
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