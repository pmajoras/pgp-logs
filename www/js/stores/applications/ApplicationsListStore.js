'use strict';
const ListStore = require('../ListStore');
const dispatcher = require('../../dispatcher').default;
const ApplicationsActions = require('../../actions/applications/ApplicationsActions');

class ApplicationsListStore extends ListStore {
  constructor() {
    super();
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
      default:
        return true;
    }

    return true;
  }
}

const applicationsListStore = new ApplicationsListStore();
dispatcher.register(applicationsListStore.handleActions.bind(applicationsListStore));

module.exports = applicationsListStore;
