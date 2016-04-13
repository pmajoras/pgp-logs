"use strict";

var common = require("../../common");
var config = common.config;
var importTest = common.importTest;
common.mockgoose(common.mongoose);

describe("Prepare Application Services Specifications Tests", function() {
  before(function(done) {
    common.mongoose.connect(config.db.connectionString, function(err) {
      done(err);
    });
  });

  importTest("user-must-exist-spec-tests", __dirname + '/authentication-service-specs/user-must-exist-spec-tests');

  after(function(done) {
    common.mongoose.unmock(function(err) {
      done(err);
    });
  });
});





