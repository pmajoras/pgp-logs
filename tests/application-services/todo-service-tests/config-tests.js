"use strict";

var common = require("../../common");
var config = common.config;
var importTest = common.importTest;
common.mockgoose(common.mongoose);

describe("Prepare TodoService Tests", function() {
  before(function(done) {
    common.mongoose.connect(config.db.connectionString, function(err) {
      done(err);
    });
  });

  importTest("create-board-tests", __dirname + '/create-board-tests');

  after(function(done) {
    common.mongoose.unmock(function(err) {
      done(err);
    });
  });
});





