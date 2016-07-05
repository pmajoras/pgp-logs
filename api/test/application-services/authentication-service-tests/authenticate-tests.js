"use strict";


var common = require("../../common");
var config = common.config;
var assert = common.assert;
common.mockgoose(common.mongoose);

var AuthenticationService = require('../../../application-services/authentication-service');
var target = new AuthenticationService();
var validUser = { username: "teste@teste22.com", password: "123456" };
var invalidUser = { username: "teste@te.com", password: "123456" };

describe("register-and-authenticate-tests", function () {

  before(function (done) {
    common.mongoose.connect(config.db.connectionString, function (mongoError) {
      if (!mongoError) {

        target.registerAndAuthenticate(validUser)
          .then((data) => {
            assert.isOk(data);
            done();
          })
          .catch((err) => {
            done(err);
          });
      }
      else {
        done(mongoError);
      }
    });
  });

  it("should authenticate the user", function (done) {
    target.authenticate(validUser)
      .then((data) => {
        assert.isOk(data);
        assert.isOk(data.id);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should not authenticate invalid user", function (done) {
    target.authenticate(invalidUser)
      .then(() => {
        done(new Error("The user could not have been authenticated"));
      })
      .catch((err) => {
        if (err && err.type === 'Specification') {
          done();
        }
        else {
          done(err);
        }
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

