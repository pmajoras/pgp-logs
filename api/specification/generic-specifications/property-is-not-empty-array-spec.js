'use strict';
var SpecificationBase = require('../specification-base');

class PropertyIsNotEmptyArraySpec extends SpecificationBase {
  /**
  * @param {string} propertyName - The property that must be validated.
  * @param {string} notSatisfiedReason - The error reason.
  * @param {number} errorCode - The error code.
  */
  constructor(propertyName, notSatisfiedReason, errorCode) {
    super((target) => {
      if (target && Array.isArray(target[propertyName]) && target[propertyName].length > 0) {
        return true;
      }

      this.notSatisfiedReason = notSatisfiedReason;
      this.errorCode = errorCode;
      return false;
    });
  }
}

module.exports = PropertyIsNotEmptyArraySpec;
