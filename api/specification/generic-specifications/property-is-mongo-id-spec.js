"use strict";
var SpecificationBase = require('../specification-base');
var validator = require('../../helpers/validators');
var iz = require('iz');

class PropertyIsMongoIdSpec extends SpecificationBase {
  /**
  * @param {string} propertyName - The property that must be validated.
  * @param {string} notSatisfiedReason - The error reason.
  * @param {number} errorCode - The error code.
  */
  constructor(propertyName, notSatisfiedReason, errorCode) {
    super((target) => {
      if (iz.required(target) && validator.isMongoId(target[propertyName])) {
        return true;
      }

      this.notSatisfiedReason = notSatisfiedReason;
      this.errorCode = errorCode;
      return false;
    });
  }
}

module.exports = PropertyIsMongoIdSpec;