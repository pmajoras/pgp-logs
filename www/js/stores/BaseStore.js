"use strict";
import { EventEmitter } from "events";

class BaseStore extends EventEmitter {
  constructor(initialState, events) {
    super();
    this.state = initialState || {};
    this.events = events || {};
  }

  setState(newState) {

    this.state = newState;
    this.emitStateChanges("change");
  }

  getState() {
    return this.state;
  }

  emitStateChanges(eventName) {
    this.emit(eventName, this.getState());
  }
}

module.exports = BaseStore;
