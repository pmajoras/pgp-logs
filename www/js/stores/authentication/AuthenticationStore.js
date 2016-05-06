"use strict";
const BaseStore = require('../BaseStore');
const dispatcher = require("../../dispatcher").default;
const authenticationActions = require("../../actions/authentication/AuthenticationActions");
const events = {
  authenticationSubmit: "EV_AUTHENTICATION_SUBMITTED"
};

class AuthenticationStore extends BaseStore {
  constructor() {
    super({
      isAuthenticated: false,
      username: '',
      token: '',
      id: ''
    }, events);
  }

  /**
  * Return if the current store state is authenticated. 
  */
  isAuthenticated() {
    return this.getState().get("isAuthenticated");
  }

  /**
   * Handles the authentication action.
   */
  handleAuthenticate(err, payload) {
    if (!err) {
      this.mergeState(payload);
    }
    else {
      this.resetState();
    }

    this.emit(this.events.authenticationSubmit, err, this.getState());
  }

  /**
   * Handles the logoff action
   */
  handleLogoff() {
    this.resetState();
  }

  /**
  * Add a listener to the authentication submit event.
  */
  addAuthenticationSubmitListener(callback) {
    this.on(this.events.authenticationSubmit, callback);
  }

  /**
   * Removes the authentication submit listener for the given callbakc.
   */
  removeAuthenticationSubmitListener(callback) {
    this.removeListener(this.events.authenticationSubmit, callback);
  }

  /**
   * Handles the store actions.
   */
  handleActions(action) {
    switch (action.type) {
      case authenticationActions.actions.authenticate: {
        this.handleAuthenticate(action.err, action.payload);
        break;
      }
      case authenticationActions.actions.logoff: {
        this.handleLogoff(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    // If action was responded to, emit change event    
    this.emitChange();
    return true;
  }

}

const authenticationStore = new AuthenticationStore();
dispatcher.register(authenticationStore.handleActions.bind(authenticationStore));

module.exports = authenticationStore;
