"use strict";
const browserHistory = require('react-router').browserHistory;

class ReactRouterHelper {
  constructor() {
  }

  redirectToUserHome() {
    browserHistory.push("/welcome");
  }

  redirectToGuestHome() {
    browserHistory.push("/");
  }
}

module.exports = new ReactRouterHelper();