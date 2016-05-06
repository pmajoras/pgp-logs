"use strict";
const authenticationStore = require('../stores/authentication/AuthenticationStore');

module.exports = function (nextState, replace) {
  if (!authenticationStore.isAuthenticated()) {
    replace({
      pathname: '/authentication',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};