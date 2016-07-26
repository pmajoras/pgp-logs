'use strict';
const EditStore = require('../EditStore');
const dispatcher = require('../../dispatcher').default;
const ApplicationsActions = require('../../actions/applications/ApplicationsActions');

class ApplicationsEditStore extends EditStore {
  constructor() {
    super();
  }

  /**
   * Handles the store actions.
   */
  handleActions(action) {
    switch (action.type) {
      case ApplicationsActions.actions.getApplicationByIdStarted: {
        this.handleLoadStarted(action.err, action.payload);
        break;
      }
      case ApplicationsActions.actions.getApplicationByIdFinished: {
        this.handleLoadFinished(action.err, action.payload);
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
      case ApplicationsActions.actions.resetEditApplication: {
        this.handleResetEditStore(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    return true;
  }
}

const applicationsEditStore = new ApplicationsEditStore();
applicationsEditStore.dispatcherIndex = dispatcher.register(applicationsEditStore.handleActions.bind(applicationsEditStore));

module.exports = applicationsEditStore;
