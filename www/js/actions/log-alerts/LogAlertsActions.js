'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';
import LogAlertsService from '../../services/log-alerts/LogAlertsService';

const actions = {
  getLogALertsStarted: 'LOGALERTS_FETCH_STARTED',
  getLogALertsFinished: 'LOGALERTS_FETCH_FINISHED',
  resolveLogAlertsStarted: 'LOGALERTS_RESOLVE_STARTED',
  resolveLogAlertsFinished: 'LOGALERTS_RESOLVE_FINISHED'
};

const logAlertService = new LogAlertsService();

function resolveLogAlerts(alertId, logAlertsIds) {
  dispatcher.dispatch(new ActionResponse(null, actions.resolveLogAlertsStarted));

  logAlertService.resolveLogAlerts(alertId, logAlertsIds)
    .then((data) => {
      dispatcher.dispatch(new ActionResponse(null, actions.resolveLogAlertsFinished, { alertId: alertId, data: data, logAlertsIds: logAlertsIds }));
    }, (err) => {
      dispatcher.dispatch(new ActionResponse(err, actions.resolveLogAlertsFinished));
    });
}

module.exports = {
  actions: actions,
  getLogAlertsByAlertId: function (alertId) {
    dispatcher.dispatch(new ActionResponse(null, actions.getLogALertsStarted));

    logAlertService.getLogAlertsByAlertId(alertId)
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getLogALertsFinished, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getLogALertsFinished));
      });
  },
  resolveLogAlertById: function (alertId, logAlertId) {
    resolveLogAlerts(alertId, [logAlertId]);
  },
  resolveLogAlerts: resolveLogAlerts
};
