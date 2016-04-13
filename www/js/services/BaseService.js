"use strict";
var Q = require('q');

class BaseService {
  constructor() {
  }

  handleApiPromise(jqueryApiPromise) {
    let deferred = Q.defer();

    jqueryApiPromise
      .done((data) => {
        deferred.resolve(data);
      }).fail((err) => {
        deferred.reject({ data: err.responseJSON, error: err, status: err.status });
      });

    return deferred.promise;
  }
}

module.exports = BaseService;