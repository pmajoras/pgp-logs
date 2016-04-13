"use strict";
var common = require(__dirname + '/common');
var importTest = common.importTest;

describe("All Tests", function() {

  before(function() {
  });

  importTest("generice-specs-tests", __dirname + '/generic-specs/config-tests');
  importTest("authentication-service-tests", __dirname + '/application-services/authentication-service-tests/config-tests');
  importTest("todo-service-tests", __dirname + '/application-services/todo-service-tests/config-tests');
  importTest("user-specs-tests", __dirname + '/domain/users/specs/config-tests');
  importTest("application-services-specs", __dirname + '/application-services/specifications/config-tests');

  after(function() {
  });
});