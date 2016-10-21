'use strict';

var UserService = require('../domain/services/users/user-service');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var appConstants = require('../config/app-constants');
var EntityWithFilterMustExistSpec = require('./specifications/entity-with-filter-must-exist-spec');
var q = require('q');
var moment = require('moment');
var messages = require('../errors-messages/messages-application').authentication;

class AuthenticationService {
  constructor(userService) {
    this._userService = userService || new UserService();
    this._userMustExistWithNameAndPasswordSpec = new EntityWithFilterMustExistSpec(this._userService,
      messages.invalidUsernameOrPassword.message,
      messages.invalidUsernameOrPassword.code);
  }

  _createToken(username, id) {
    return jwt.sign({ username: username, _id: id, permissions: [appConstants.mustBeAuthenticatedPermission] }, config.secret, {
      expiresIn: '72h' // expires in 1 hour
    });
  }

  _createAuthenticationResponse(username, userId) {
    // create a token
    let token = this._createToken(username, userId);
    return { token: token, id: userId, expiresAt: moment().add(1, 'hour').format() };
  }

  registerAndAuthenticate(userViewModel) {

    return this._userService.save(userViewModel)
      .then((newEntity) => {
        return q(this._createAuthenticationResponse(newEntity.username, newEntity._id));
      })
      .catch((err) => {
        return q.reject(err);
      });
  }

  /**
  *
  */
  authenticate(authenticateViewModel) {

    return this._userMustExistWithNameAndPasswordSpec.isSatisfiedBy(authenticateViewModel)
      .then((user) => {
        return q(this._createAuthenticationResponse(user.username, user._id));
      })
      .catch((err) => {
        return q.reject(err);
      });
  }
}

module.exports = AuthenticationService;
