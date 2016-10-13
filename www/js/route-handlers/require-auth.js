'use strict';
const AuthenticationService = require('../services/authentication/AuthenticationService');
const authenticationService = new AuthenticationService();

module.exports = function (nextState, replace) {
  if (!authenticationService.isAuthenticated()) {

    replace({
      pathname: '/authentication',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};
