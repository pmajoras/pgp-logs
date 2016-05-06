"use strict";

var ApplicationServiceSpec = require('./application-service-spec');
var Q = require('q');

class EntityWithFilterMustExistSpec extends ApplicationServiceSpec {
  constructor(domainService, message, errorCode) {
    super((filter) => {

      if (filter && domainService) {
        let deferred = Q.defer();

        domainService.findOne(filter)
          .then((entity) => {
            if (entity) {
              deferred.resolve(entity);
            }
            else {
              deferred.reject(this.getSpecificationError());
            }
          })
          .catch((err) => {
            deferred.reject(err);
          });

        return deferred.promise;
      }
      else {
        return Q.reject(this.getSpecificationError());
      }
    });

    this.notSatisfiedReason = message || "A entidade com o id informado não foi encontrada.";
    this.errorCode = errorCode || 200;
  }
}

module.exports = EntityWithFilterMustExistSpec;