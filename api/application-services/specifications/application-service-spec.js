"use strict";

var SpecificationBase = require('../../specification/specification-base');
var appError = require('../../app-errors/app-error').createSpecificationError;
class ApplicationServiceSpec extends SpecificationBase {
  constructor(isSatisfiedPromiseOrFunction) {
    super(isSatisfiedPromiseOrFunction);
  }

  getSpecificationError() {
    return appError([this.getError()]);
  }
}

module.exports = ApplicationServiceSpec;