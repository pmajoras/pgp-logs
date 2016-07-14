'use strict';

const SpecificationBase = require('../../specification/specification-base');
const appErrorsFactory = require('../../app-errors/app-errors-factory');

class ApplicationServiceSpec extends SpecificationBase {
  constructor(isSatisfiedPromiseOrFunction) {
    super(isSatisfiedPromiseOrFunction);
  }

  getSpecificationError() {
    return appErrorsFactory.createSpecificationError([this.getError()]);
  }
}

module.exports = ApplicationServiceSpec;
