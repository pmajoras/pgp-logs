"use strict";
var specificationError = require('../app-errors/app-error').createSpecificationError;
var Q = require('q');

module.exports = {
  "filterByNotSatisfiedSpecifications": function(specifications, target) {
    if (!Array.isArray(specifications) || specifications.length === 0) {
      return Q([]);
    }

    var deferred = Q.defer();

    var specificationsToSatisfy = [];
    var specificationsToSatisfyMethods = [];
    specifications.forEach((specification) => {
      if (typeof specification.isSatisfiedBy == "function") {
        specificationsToSatisfy.push(specification);
        specificationsToSatisfyMethods.push(specification.isSatisfiedBy(target));
      }
    });

    Q.all(specificationsToSatisfyMethods).done((values) => {
      let notSatisfiedSpecifications = [];
      for (let i = 0; i < specificationsToSatisfy.length; i++) {
        if (values[i] !== true) {
          notSatisfiedSpecifications.push(specificationsToSatisfy[i]);
        }
      }
      deferred.resolve(notSatisfiedSpecifications);
    });

    return deferred.promise;
  },
  "getErrorFromNotSatisfiedSpecifications": function(specifications, target) {
    var deferred = Q.defer();

    this.filterByNotSatisfiedSpecifications(specifications, target)
      .then((notSatisfiedSpecs) => {
        var errors = [];

        notSatisfiedSpecs.forEach((notSatisfiedSpec) => {
          errors.push(notSatisfiedSpec.getError());
        });

        deferred.resolve(errors.length > 0 ? specificationError(errors) : null);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
};