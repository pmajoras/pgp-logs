"use strict";
const EventEmitter = require('events').EventEmitter;
const JsonHelperService = require('../services/util-services/JsonHelperService');

class BaseStore extends EventEmitter {
  constructor(initialState, events) {
    super();
    this.initialState = JsonHelperService.simpleClone(initialState || {});

    this.state = initialState || {};
    this.events = events || {};
    this.events.change = "EV_CHANGE";
  }

  setState(newState) {

    this.state = newState;
    this.emitStateChanges("change");
  }

  getState() {
    return this.state;
  }

  reset() {
    this.setState(JsonHelperService.simpleClone(initialState));
  }

  emitStateChanges(eventName) {
    this.emit(eventName, this.getState());
  }
}

module.exports = BaseStore;
