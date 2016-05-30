"use strict";
var BaseDomainService = require('../../base-domain-service');
var specifications = require('./specs/specifications');

class ApplicationService extends BaseDomainService {
  constructor() {
    super("application");
  }

  /**
  * @returns {Array} - An array of the save specifications.
  */
  getSaveSpecifications() {
    let saveSpecifications = super.getSaveSpecifications();

    saveSpecifications = saveSpecifications
      .concat(super.getSpecsFromArrayOfFunctions(specifications.saveSpecs));
    return saveSpecifications;
  }
}

module.exports = ApplicationService;