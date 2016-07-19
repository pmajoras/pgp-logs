'use strict';
const BaseStore = require('./BaseStore');

const editStoreEvents = {
  saveStarted: 'SAVE_STARTED',
  saveFinished: 'SAVE_FINISHED'
};

/**
 *
 * @class EditStore
 * @extends {BaseStore}
 */
class EditStore extends BaseStore {
  constructor(defaultState) {
    defaultState = defaultState || {};
    defaultState.isLoading = false;
    defaultState.isEditing = false;
    defaultState.hasError = false;

    defaultState.data = null;
    defaultState.errors = [];
    super(defaultState, editStoreEvents);
  }

  hasSaveErrors() {
    return this.getState().get('errors').size > 0;
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
    var newState = { isLoading: false, hasError: false, data: null, errors: [] };

    if (!err) {
      newState.data = payload;
    }
    else {
      newState.hasError = true;
    }

    this.mergeState(newState);
    this.emitChange();
  }

  handleSaveStarted() {
    this.mergeState({ isLoading: true });
    this.emitChange();
    this.emit(this.events.saveStarted);
  }

  handleSaveFinished(err, payload) {
    var newState = { isLoading: false, hasError: false, errors: [] };

    if (!err) {
      newState.data = payload;
    }
    else {
      newState.errors = err;
      newState.hasError = true;
    }

    this.mergeState(newState);
    this.emitChange();
    this.emit(this.events.saveFinished, err, payload);
  }
}

module.exports = EditStore;
