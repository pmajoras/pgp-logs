'use strict';
var SpecificationBase = require('../specification-base');

class PropertyIsNotEmptyTypeArraySpec extends SpecificationBase {
  /**
  * @param {string} propertyName - The property that must be validated.
  * @param {string} arrayType - The array type that must be validated.
  * @param {string} notSatisfiedReason - The error reason.
  * @param {number} errorCode - The error code.
  */
  constructor(propertyName, arrayType, notSatisfiedReason, errorCode) {
    super((target) => {
      if (target && Array.isArray(target[propertyName]) && target[propertyName].length > 0) {
        var isValid = true;

        target[propertyName].forEach((value) => {
          if (isValid) {
            isValid = typeof value === arrayType;
          }
        });

        if (isValid) {
          return isValid;
        }
      }

      this.notSatisfiedReason = notSatisfiedReason;
      this.errorCode = errorCode;
      return false;
    });
  }
}

module.exports = PropertyIsNotEmptyTypeArraySpec;
