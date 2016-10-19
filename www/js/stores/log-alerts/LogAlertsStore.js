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
      let foundApp = null;
      let foundIndex = ApplicationsListStore.getState().get('data').forEach((app) => {
        let foundAlert = app.get('alerts').find(alert => alert.get('_id') === payload.alertId);
        if (foundAlert) {
          foundApp = app.toJS();
          return false;
        }
      }) - 1;

      if (foundApp) {
        foundApp.alerts.forEach((alert) => {
          if (alert._id === payload.alertId) {
            alert.count = alert.count - resolvedLogAlertsCount;
            alert.count = alert.count >= 0 ? alert.count : 0;
          }
        });
        ApplicationsListStore.state = ApplicationsListStore.getState().updateIn(['data', foundIndex], () => Immutable.fromJS(foundApp));
        ApplicationsListStore.emitChange();
      }

      // TODO Review this.
      payload.logAlertsIds.forEach((logAlertId) => {
        let deleteIndex = this.getState().get('data').findIndex((obj) => obj.get('_id') === logAlertId);
        if (deleteIndex > -1) {
          this.state = this.getState().updateIn(['data'], (dataArray) => dataArray.delete(deleteIndex));
        }
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
