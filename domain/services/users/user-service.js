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
    let mongoPromise = (filter) => {
      return this.findAll(filter);
    };

    saveSpecifications.push(userSpecifications.getUsernameMustBeAnEmailSpec());
    saveSpecifications.push(userSpecifications.getUsernameMustBeUniqueSpec(mongoPromise));
    saveSpecifications.push(userSpecifications.getPasswordMustHaveSixOrMoreCharsSpec());
    return saveSpecifications;
  }

  getUpdateSpecifications() {
    let updateSpecifications = super.getUpdateSpecifications();

    updateSpecifications.push(userSpecifications.getUsernameMustBeAnEmailSpec());
    updateSpecifications.push(userSpecifications.getPasswordMustHaveSixOrMoreCharsSpec());
    return updateSpecifications;
  }
}

module.exports = UserService;