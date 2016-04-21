"use strict";
var BaseDomainService = require('../../base-domain-service');
var userSpecifications = require('./specs/user-specifications');

class UserService extends BaseDomainService {
  constructor() {
    super("user");
  }

  /**
  * @returns {Array} - An array of the save specifications.
  */
  getSaveSpecifications() {
    let saveSpecifications = super.getSaveSpecifications();

    saveSpecifications = saveSpecifications
      .concat(super.getSpecsFromArrayOfFunctions(userSpecifications.saveSpecs));
    return saveSpecifications;
  }

  getUpdateSpecifications() {
    let updateSpecifications = super.getUpdateSpecifications();

    updateSpecifications = updateSpecifications
      .concat(super.getSpecsFromArrayOfFunctions(userSpecifications.updateSpecs));
    return updateSpecifications;
  }
}

module.exports = UserService;