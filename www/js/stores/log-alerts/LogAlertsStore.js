'use strict';
const ListStore = require('../ListStore');
const dispatcher = require('../../dispatcher').default;
const Immutable = require('immutable');
const ApplicationsListStore = require('../applications/ApplicationsListStore');
const LogAlertsActions = require('../../actions/log-alerts/LogAlertsActions');

class LogAlertsStore extends ListStore {
  constructor() {
    super();
  }

  handleResolveAlertsFinish(err, payload) {
    let mergeObject = { isLoading: false };
    this.mergeState(mergeObject);

    if (!err) {
      // TODO Remove this.
      let resolvedLogAlertsCount = payload.data.nModified;
      let foundAlertIndex = null;
      let foundIndex = ApplicationsListStore.getState().get('data').forEach((app) => {
        foundAlertIndex = app.get('alerts').findIndex(alert => alert.get('_id') === payload.alertId);
        if (foundAlertIndex > -1) {
          return false;
        }
      }) - 1;

      if (foundAlertIndex > -1) {
        ApplicationsListStore.state = ApplicationsListStore.getState().updateIn(['data', foundIndex, 'alerts', foundAlertIndex, 'count'],
          count => {
            let newCount = count - resolvedLogAlertsCount;
            newCount = newCount >= 0 ? newCount : 0;
            return newCount;
          });
        ApplicationsListStore.emitChange();
      }

      // TODO Review this.
      payload.logAlertsIds.forEach((logAlertId) => {
        this.state = this.getState().updateIn(['data'], (dataArray) => dataArray.filter((data) => data.get('_id') !== logAlertId));
      });
    }

    this.emitChange();
  }

  /**
   * Handles the store actions.
   */
  handleActions(action) {

    try {
      switch (action.type) {
        case LogAlertsActions.actions.getLogALertsStarted: {
          this.handleLoadStarted(action.err, action.payload);
          break;
        }
        case LogAlertsActions.actions.getLogALertsFinished: {
          this.handleLoadFinished(action.err, action.payload);
          break;
        }
        case LogAlertsActions.actions.resolveLogAlertsStarted: {
          this.handleLoadStarted(action.err, action.payload);
          break;
        }
        case LogAlertsActions.actions.resolveLogAlertsFinished: {
          this.handleResolveAlertsFinish(action.err, action.payload);
          break;
        }
        default:
          return true;
      }
    }
    catch (err) {
      console.log('LogAlertsStore >> handleActions >> err', err);
    }

    return true;
  }
}

const logAlertsStore = new LogAlertsStore();
dispatcher.register(logAlertsStore.handleActions.bind(logAlertsStore));

module.exports = logAlertsStore;
