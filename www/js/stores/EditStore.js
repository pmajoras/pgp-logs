'use strict';
const BaseStore = require('./BaseStore');
const extend = require('util')._extend;
const editModes = require('../constants/edit-modes');
const events = {
  saveFinished: 'EV_SAVE_FINISHED',
  saveStarted: 'EV_SAVE_STARTED'
};

const getDefaultState = () => {
  return {
    isLoading: false,
    isSaving: false,
    mode: editModes.view,
    hasErrorOnLoad: false,
    data: null,
    errors: []
  };
};

/**
 *
 * @class EditStore
 * @extends {BaseStore}
 */
class EditStore extends BaseStore {
  constructor(defaultState) {
    defaultState = defaultState || {};
    defaultState = extend(getDefaultState(), defaultState);

    super(defaultState, events);
  }

  hasSaveErrors() {
    return this.getState().get('errors').size > 0;
  }

  hasErrorOnLoad() {
    return this.getState().get('hasErrorOnLoad');
  }

  isLoading() {
    return this.getState().get('isLoading');
  }

  isSaving() {
    return this.getState().get('isSaving');
  }

  getMode() {
    return this.getState().get('mode');
  }

  setEditMode(newState, mode) {

    switch (mode) {
      case editModes.edit:
        newState.mode = editModes.edit;
        break;
      case editModes.view:
        newState.mode = editModes.view;
        break;
      default:
        throw new Error('Invalid edit mode passed to the setEditMode in the editStore.');
    }
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
    var newState = getDefaultState();

    if (!err) {
      newState.data = payload.data;
      this.setEditMode(newState, payload.mode);
    }
    else {
      newState.hasErrorOnLoad = true;
    }

    this.mergeState(newState);
    this.emitChange();
  }

  handleChangeMode(err, payload) {
    var newState = {};

    this.setEditMode(newState, payload);

    this.mergeState(newState);
    this.emitChange();
  }

  handleSaveStarted(err, payload) {
    this.mergeState({ isLoading: true, isSaving: true, data: payload });
    this.emitChange();
    this.emit(events.saveStarted);
  }

  handleSaveFinished(err, payload) {
    var newState = getDefaultState();
    delete newState.data;

    if (!err) {
      newState.data = payload.data;
      newState.mode = payload.mode;
    }
    else {
      newState.errors = err;
    }

    this.mergeState(newState);
    this.emitChange();
    this.emit(events.saveFinished, err, payload);
  }

  handleResetEditStore() {
    this.resetState();
    this.emitChange();
  }

  /**
  * Add a listener to the save started event.
  */
  addSaveStartedListener(callback) {
    this.on(this.events.saveStarted, callback);
  }

  removeSaveStartedListener(callback) {
    this.removeListener(this.events.saveStarted, callback);
  }

  /**
  * Add a listener to the save finished event.
  */
  addSaveFinishedListener(callback) {
    this.on(this.events.saveFinished, callback);
  }

  removeSaveFinishedListener(callback) {
    this.removeListener(this.events.saveFinished, callback);
  }
}

module.exports = EditStore;
