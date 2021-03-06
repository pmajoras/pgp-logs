'use strict';
const BaseStore = require('./BaseStore');

/**
 *
 * @class ListStore
 * @extends {BaseStore}
 */
class ListStore extends BaseStore {
  constructor(defaultState) {
    defaultState = defaultState || {};
    defaultState.isLoading = false;
    defaultState.data = [];
    defaultState.hasError = false;
    super(defaultState);
  }

  hasError() {
    return this.getState().get('hasError');
  }

  isLoading() {
    return this.getState().get('isLoading');
  }

  /**
   *
   */
  handleLoadStarted() {
    this.mergeState({ isLoading: true });
    this.emitChange();
  }

  /**
   *
   * @param {any} err
   * @param {any} payload
   */
  handleLoadFinished(err, payload) {
    var newState = { isLoading: false, data: [], hasError: false };

    if (!err) {
      newState.data = payload;
    }
    else {
      newState.hasError = true;
    }

    this.mergeState(newState);
    this.emitChange();
  }

  handleDeleteFinished(err, payload) {
    var newState = { isLoading: false, hasError: false };
    newState.data = this.getState().get('data').toJS();

    if (!err) {
      newState.data = newState.data.filter((value) => value._id !== payload);
    }

    this.setState(newState);
    this.emitChange();
  }
}

module.exports = ListStore;
