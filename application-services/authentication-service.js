"use strict";
var UserService = require('../domain/services/users/user-service');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var appConstants = require('../config/app-constants');
var UserMustExistSpec = require('./specifications/authentication-service-specs/user-must-exist-spec');
var Q = require('q');
var moment = require('moment');

class AuthenticationService {
  constructor(userService) {
    this._userService = userService || new UserService();
  }

  _createToken(username, id) {
    return jwt.sign({ username: username, _id: id, permissions: [appConstants.mustBeAuthenticatedPermission] }, config.secret, {
      expiresIn: "1h" // expires in 1 hour
    });
  }

  _createAuthenticationResponse(username, userId) {
    // create a token
    let token = this._createToken(username, userId);
    return { token: token, id: userId, expiresAt: moment().add(1, "hour").format() };
  }

  registerAndAuthenticate(userViewModel) {
    let deferred = Q.defer();
    this._userService.save(userViewModel)
      .then((newEntity) => {
        deferred.resolve(this._createAuthenticationResponse(newEntity.username, newEntity._id));
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  /** 
   * 
  */
  authenticate(authenticateViewModel) {
    let deferred = Q.defer();

    let userMustExistSpec = new UserMustExistSpec(this._userService);

    userMustExistSpec.isSatisfiedBy(authenticateViewModel)
      .then((user) => {

        deferred.resolve(this._createAuthenticationResponse(user.username, user._id));
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
}

module.exports = AuthenticationService;