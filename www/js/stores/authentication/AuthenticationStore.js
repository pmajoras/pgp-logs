"use strict";
const BaseStore = require('../BaseStore');
const dispatcher = require("../../dispatcher").default;
const authenticationActions = require("../../actions/authentication/AuthenticationActions");
const events = {
  authenticationSubmitted: "EV_AUTHENTICATION_SUBMITTED",
  authenticationChanged: "EV_AUTHENTICATION_CHANGED",
  registerSubmitted: "EV_REGISTRATION_SUBMITTED"
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
    newState = newState || {};

    super.setState({
      isAuthenticated: newState.isAuthenticated || false,
      username: newState.username || '',
      token: newState.token || '',
      id: newState.id || ''
    });
  }

  registerSubmitted(err, payload) {
    payload = payload || {};
    if (!err) {
      payload.isAuthenticated = true;
    }
    else {
      payload.isAuthenticated = false;
    }

    if (this.state.isAuthenticated !== payload.isAuthenticated) {
      this.setState(payload);
      this.emit(this.events.authenticationChanged, null, this.state.isAuthenticated);
    }
    this.emit(this.events.registerSubmitted, err, payload);
  }

  handleAuthenticate(err, payload) {
    payload = payload || {};
    if (!err) {
      payload.isAuthenticated = true;
    }
    else {
      payload.isAuthenticated = false;
    }

    if (this.state.isAuthenticated !== payload.isAuthenticated) {
      this.setState(payload);
      this.emit(this.events.authenticationChanged, null, this.state.isAuthenticated);
    }
    this.emit(this.events.authenticationSubmitted, err, payload);
  }

  handleLogoff(err, payload) {
    this.setState(null);
    this.emit(this.events.authenticationChanged, null, false);
  }

  handleActions(action) {
    switch (action.type) {
      case authenticationActions.actions.authenticate: {
        this.handleAuthenticate(action.err, action.payload);
        break;
      }
      case authenticationActions.actions.register: {
        this.registerSubmitted(action.err, action.payload);
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
