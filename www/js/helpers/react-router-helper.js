'use strict';
const browserHistory = require('react-router').browserHistory;

class ReactRouterHelper {
  constructor() {
  }

  redirectToState(state) {
    browserHistory.push(state);
  }

  redirectToUserHome() {
    this.redirectToState('welcome');
  }

  redirectToGuestHome() {
    browserHistory.push('/');
  }

  redirectToState(state, id) {
    var history = '/' + state;
    if (id) {
      history += '/' + id;
    }

    browserHistory.push(history);
  }
}

module.exports = new ReactRouterHelper();
