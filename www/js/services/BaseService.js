'use strict';
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

        var errData = [];
        if (Array.isArray(err.responseJSON)) {
          errData = err.responseJSON;
        }
        else {
          errData.push({ message: 'Ocorreu um erro durante a requisição, favor tentar novamente.', code: '0' });
        }

        console.log('err', err);
        deferred.reject(errData);
      });

    return deferred.promise;
  }
}

module.exports = BaseService;
