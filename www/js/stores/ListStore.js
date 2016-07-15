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
    super(defaultState, { loadStarted: 'LIST_LOAD_STARTED', loadFinished: 'LIST_LOAD_FINISHED' });
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
    console.log("newState", newState);
    this.mergeState(newState);
    this.emitChange();
  }
}

module.exports = ListStore;
