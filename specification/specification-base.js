"use strict";
var Q = require('q');

class SpecificationBase {
  constructor(isSatisfiedPromiseOrFunction) {
    this.notSatisfiedReason = "";
    this.errorCode = null;
    this.isSatisfiedFunction = isSatisfiedPromiseOrFunction;
  }

  /**
   * @param {JSON} target - The target that will be test to be satisfied.
   * @param {Function} onSuccess - A function that will be called before the promises return. Generaly used for set dependencies when chaining promises.
   * @returns {Promise} Returns a promise with the result.
   */
  isSatisfiedBy(target, onSuccess) {

    return Q(this.isSatisfiedFunction(target))
      .then((data) => {
        if (typeof onSuccess === 'function') {
          onSuccess(data);
        }
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  getError() {
    return { "code": this.errorCode, "message": this.notSatisfiedReason };
  }
}

module.exports = SpecificationBase;