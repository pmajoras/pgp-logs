'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';
import ApplicationsService from '../../services/applications/ApplicationsService';

var actions = {
  getApplicationsStarted: 'APPLICATIONS_FETCH_STARTED',
  getApplicationsFinished: 'APPLICATIONS_FETCH_SUCCESS'
};

module.exports = {
  actions: actions,
  getApplications: function () {
    let service = new ApplicationsService();
    dispatcher.dispatch(new ActionResponse(null, actions.getApplicationsStarted));

    service.getApplications()
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getApplicationsFinished, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getApplicationsFinished));
      });
  }
};
