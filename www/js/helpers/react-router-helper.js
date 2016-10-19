'use strict';
const hashHistory = require('react-router').hashHistory;

class ReactRouterHelper {
  constructor() {
  }

  redirectToState(state) {
    hashHistory.push(state);
  }

  redirectToUserHome() {
    this.redirectToState('welcome');
  }

  redirectToGuestHome() {
    hashHistory.push('/');
  }
}

module.exports = new ReactRouterHelper();
