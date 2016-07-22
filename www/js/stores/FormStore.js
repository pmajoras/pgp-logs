'use strict';
const BaseStore = require('./BaseStore');
const autobind = require('autobind-decorator');

/**
 *
 * @class FormStore
 * @extends {BaseStore}
 */
class FormStore extends BaseStore {
  constructor(defaultState) {
    defaultState = defaultState || {};
    defaultState.isLoading = false;
    defaultState.data = [];
    defaultState.hasError = false;
    super(defaultState);
  }

  @autobind
  handleActions(action) {
    switch (action.type) {
      case ApplicationsActions.actions.getApplicationsStarted: {
        this.handleLoadStarted(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    return true;
  }
}



const formStore = new FormStore();

dispatcher.register(formStore.handleActions);

module.exports = applicationsListStore;
