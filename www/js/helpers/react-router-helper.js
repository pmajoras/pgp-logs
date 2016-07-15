'use strict';
const browserHistory = require('react-router').browserHistory;

class ReactRouterHelper {
  constructor() {
  }

  redirectToState(state) {
    browserHistory.push(state);
  }

  redirectToUserHome() {
    browserHistory.push('/welcome');
  }

  redirectToGuestHome() {
    browserHistory.push('/');
  }
}

module.exports = new ReactRouterHelper();
