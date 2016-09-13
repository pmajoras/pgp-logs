'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';
import LogAlertsService from '../../services/log-alerts/LogAlertsService';

const actions = {
  getLogALertsStarted: 'LOGALERTS_FETCH_STARTED',
  getLogALertsFinished: 'LOGALERTS_FETCH_FINISHED'
};

const logAlertService = new LogAlertsService();

module.exports = {
  actions: actions,
  getLogAlerts: function () {
    dispatcher.dispatch(new ActionResponse(null, actions.getLogALertsStarted));

    logAlertService.getApplicationLogAlerts()
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getLogALertsFinished, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getLogALertsFinished));
      });
  }
};
