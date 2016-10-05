'use strict';
const ListStore = require('../ListStore');
const Immutable = require('immutable');
const dispatcher = require('../../dispatcher').default;
const ApplicationsActions = require('../../actions/applications/ApplicationsActions');

class ApplicationsListStore extends ListStore {
  constructor() {
    super();
  }

  handleAddEmptyApplication(err, payload) {
    let immutableSavedObject = Immutable.fromJS(payload);
    this.state = this.getState().updateIn(['data'], (dataArray) => dataArray.push(immutableSavedObject));
    this.emitChange();
  }

  handleCancelEmptyApplication(err, payload) {
    let emptyApplicationIndex = this.getState().get('data').findIndex((obj) => obj.get('tempId') === payload);

    if (emptyApplicationIndex > -1) {
      this.state = this.getState().updateIn(['data'], (dataArray) => dataArray.delete(emptyApplicationIndex));
    }

    this.emitChange();
  }

  handleSaveStarted() {
    this.mergeState({ isLoading: true });
    this.emitChange();
  }

  handleSaveFinished(err, payload) {
    let mergeObject = { isLoading: false };
    this.mergeState(mergeObject);

    if (!err) {
      let tempId = !payload.tempId;
      let savedObject = payload.data;
      let immutableSavedObject = Immutable.fromJS(savedObject);
      let savedElementIndex = -1;

      if (tempId) {
        savedElementIndex = this.getState().get('data').findIndex((obj) => obj.get('tempId') === tempId);
      }
      else {
        savedElementIndex = this.getState().get('data').findIndex((obj) => obj.get('_id') === payload.id);
      }

      if (savedElementIndex > -1) {
        this.state = this.getState().updateIn(['data', savedElementIndex], () => immutableSavedObject);
      }
    }

    this.emitChange();
  }

  /**
   * Handles the store actions.
   */
  handleActions(action) {
    switch (action.type) {
      case ApplicationsActions.actions.getApplicationsStarted: {
        this.handleLoadStarted(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.getApplicationsFinished: {
        this.handleLoadFinished(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.deleteApplicationByIdStarted: {
        this.handleLoadStarted(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.deleteApplicationByIdFinished: {
        this.handleDeleteFinished(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.addEmptyApplication: {
        this.handleAddEmptyApplication(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.cancelEmptyApplication: {
        this.handleCancelEmptyApplication(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.saveApplicationStarted: {
        this.handleSaveStarted(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.saveApplicationFinished: {
        this.handleSaveFinished(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    return true;
  }
}

const applicationsListStore = new ApplicationsListStore();
dispatcher.register(applicationsListStore.handleActions.bind(applicationsListStore));

module.exports = applicationsListStore;
