'use strict';
const appErrorsFactory = require('../app-errors/app-errors-factory');
const q = require('q');

module.exports = {
  filterByNotSatisfiedSpecifications: function (specifications, target) {
    if (!Array.isArray(specifications) || specifications.length === 0) {
      return q([]);
    }

    let deferred = q.defer();

    let specificationsToSatisfy = [];
    let specificationsToSatisfyMethods = [];
    specifications.forEach((specification) => {
      if (typeof specification.isSatisfiedBy == 'function') {
        specificationsToSatisfy.push(specification);
        specificationsToSatisfyMethods.push(specification.isSatisfiedBy(target));
      }
    });

    q.all(specificationsToSatisfyMethods).done((values) => {
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
  getErrorFromNotSatisfiedSpecifications: function (specifications, target) {
    let deferred = q.defer();

    this.filterByNotSatisfiedSpecifications(specifications, target)
      .then((notSatisfiedSpecs) => {
        let errors = [];

        notSatisfiedSpecs.forEach((notSatisfiedSpec) => {
          errors.push(notSatisfiedSpec.getError());
        });

        deferred.resolve(errors.length > 0 ? appErrorsFactory.createSpecificationError(errors) : null);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
};
