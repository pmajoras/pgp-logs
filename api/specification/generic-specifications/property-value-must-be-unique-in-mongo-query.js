'use strict';
var SpecificationBase = require('../specification-base');
var q = require('q');

class PropertyValueMustBeUniqueInMongoQuery extends SpecificationBase {
  /**
  * @param {string} propertyName - The property that must be validated.
  * @param {Promise} mongoPromise - A promise that will return the mongo entities.
  * @param {string} notSatisfiedReason - The error reason.
  * @param {number} errorCode - The error code.
  */
  constructor(propertyName, mongoPromise, notSatisfiedReason, errorCode) {

    super((target) => {
      let deferred = q.defer();
      let filter = {};
      filter[propertyName] = target[propertyName];

      q(mongoPromise(filter, target)).then((entities) => {
        let isSatisfied = !entities || entities.length === 0 || entities.every(entity => entity._id.equals(target._id));
        if (!isSatisfied) {
          this.notSatisfiedReason = notSatisfiedReason;
          this.errorCode = errorCode;
        }
        deferred.resolve(isSatisfied);
      }, (err) => {
        deferred.reject(err);
      });

      return deferred.promise;
    });
  }
}

module.exports = PropertyValueMustBeUniqueInMongoQuery;
