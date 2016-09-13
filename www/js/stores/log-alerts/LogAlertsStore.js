'use strict';
const ListStore = require('../ListStore');
const dispatcher = require('../../dispatcher').default;
const LogAlertsActions = require('../../actions/log-alerts/LogAlertsActions');

class LogAlertsStore extends ListStore {
  constructor() {
    super();
  }

  /**
   * Handles the store actions.
   */
  handleActions(action) {
    switch (action.type) {
      case LogAlertsActions.actions.getLogALertsStarted: {
        this.handleLoadStarted(action.err, action.payload);
        break;
      }
      case LogAlertsActions.actions.getLogALertsFinished: {
        this.handleLoadFinished(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    return true;
  }
}

const logAlertsStore = new LogAlertsStore();
dispatcher.register(logAlertsStore.handleActions.bind(logAlertsStore));

module.exports = logAlertsStore;
