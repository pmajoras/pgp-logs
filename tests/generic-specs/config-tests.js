"use strict";

var common = require("../common");
var config = common.config;
var importTest = common.importTest;
common.mockgoose(common.mongoose);

describe("Prepare Generic Specifications Tests", function() {
  before(function(done) {
    common.mongoose.connect(config.db.connectionString, function(err) {
      done(err);
    });
  });

  importTest("property-is-mongo-id-spec-test", __dirname + '/property-is-mongo-id-spec-test');
  importTest("property-is-required-spec-test", __dirname + '/property-is-required-spec-test');
  importTest("property-must-be-an-email-spec-test", __dirname + '/property-must-be-an-email-spec-test');
  importTest("property-value-must-be-unique-in-mongo-query-test", __dirname + '/property-value-must-be-unique-in-mongo-query-test');

  after(function(done) {
    common.mongoose.unmock(function(err) {
      done(err);
    });
  });
});