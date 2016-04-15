"use strict";
const BaseStore = require('../BaseStore');
const dispatcher = require("../../dispatcher").default;
const authenticationActions = require("../../actions/authentication/AuthenticationActions");
const events = {
  authenticationSubmitted: "EV_AUTHENTICATION_SUBMITTED",
  registerSubmitted: "EV_REGISTRATION_SUBMITTED",
  logoffSubmitted: "EV_LOGOFF_SUBMITTED"
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


  setState(newState) {
    if (!newState) {
      super.reset();
    }
    else {
      super.setState(newState);
    }
  }

  _handleAuthenticationChanged(err, payload) {
    payload = payload || {};
    if (!err) {
      payload.isAuthenticated = true;
    }
    else {
      payload.isAuthenticated = false;
    }

    if (this.state.isAuthenticated !== payload.isAuthenticated) {
      this.setState(payload);
    }
  }

  handleRegister(err, payload) {

    this._handleAuthenticationChanged(err, payload);
    this.emit(this.events.registerSubmitted, err, payload);
  }

  handleAuthenticate(err, payload) {

    this._handleAuthenticationChanged(err, payload);
    this.emit(this.events.authenticationSubmitted, err, payload);
  }

  handleLogoff(err, payload) {
    this.reset();
    this.emit(this.events.logoffSubmitted, err, payload);
  }

  handleActions(action) {
    switch (action.type) {
      case authenticationActions.actions.authenticate: {
        this.handleAuthenticate(action.err, action.payload);
        break;
      }
      case authenticationActions.actions.register: {
        this.handleRegister(action.err, action.payload);
        break;
      }
      case authenticationActions.actions.logoff: {
        this.handleLogoff(action.err, action.payload);
        break;
      }
    }
  }

}

const authenticationStore = new AuthenticationStore();
dispatcher.register(authenticationStore.handleActions.bind(authenticationStore));

module.exports = authenticationStore;
