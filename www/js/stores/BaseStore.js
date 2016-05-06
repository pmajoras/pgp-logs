"use strict";
const EventEmitter = require('events').EventEmitter;
const Immutable = require('immutable');

class BaseStore extends EventEmitter {
  constructor(defaultState, events) {
    super();
    this._defaultState = defaultState || {};

    this.state = Immutable.fromJS(this._defaultState || {});
    this.events = events || {};
    this.events.change = "STORE_CHANGE";
  }

  /**
   * Reset the state of the store to the default state.
   */
  resetState() {
    this.setState(this._defaultState);
  }

  /**
   * Set the current store state.
   */
  setState(newState) {
    this.state = Immutable.fromJS(newState || {});
  }

  /**
   * Merge the current store state with the new state.
   */
  mergeState(newState) {
    var immutableNewState = Immutable.fromJS(newState || {});
    this.state = this.getState().mergeDeep(immutableNewState);
  }

  /**
   * Get the current store state.
   */
  getState() {
    return this.state;
  }

  /**
   * Add a listener to the change event.
   */
  addChangeListener(callback) {
    this.on(this.events.change, callback);
  }

  /**
   * Removes the change listener of the given callback
   */
  removeChangeListener(callback) {
    this.removeListener(this.events.change, callback);
  }

  /**
   * Emits store changes.
   */
  emitChange() {
    this.emit(this.events.change);
  }
}

module.exports = BaseStore;
