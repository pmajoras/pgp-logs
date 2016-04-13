"use strict";

var ApplicationServiceSpec = require('../application-service-spec');
var Q = require('q');

class UserMustExistSpec extends ApplicationServiceSpec {
  constructor(userService) {
    super((target) => {

      if (target &&
        target.password &&
        typeof target.password == 'string' &&
        target.username &&
        typeof target.username == 'string') {

        let deferred = Q.defer();

        userService.findOne({ username: target.username, password: target.password })
          .then((user) => {
            if (user) {
              deferred.resolve(user);
            } else {
              deferred.reject(this.getSpecificationError());
            }
          }, (err) => {
            deferred.reject(err);
          });

        return deferred.promise;
      }
      else {

        return Q.reject(this.getSpecificationError());
      }
    });

    this.notSatisfiedReason = "Usuário ou senha inválidos.";
    this.errorCode = 200;
  }
}

module.exports = UserMustExistSpec;