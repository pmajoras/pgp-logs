"use strict";

var common = require("../../common");
var config = common.config;
var assert = common.assert;
common.mockgoose(common.mongoose);

var AuthenticationService = require('../../../application-services/authentication-service');
var target = new AuthenticationService();

describe("register-and-authenticate-tests", function () {

  before(function (done) {
    common.mongoose.connect(config.db.connectionString, function (err) {
      if (!err) {
        done();
      }
      else {
        done(err);
      }
    });
  });

  it("should register and authenticate the user", function (done) {

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

  it("should not register and authenticate the same user", function (done) {
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

