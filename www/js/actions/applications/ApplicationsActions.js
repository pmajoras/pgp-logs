'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';
import ApplicationsService from '../../services/applications/ApplicationsService';

var actions = {
  getApplicationsStarted: 'APPLICATIONS_FETCH_STARTED',
  getApplicationsFinished: 'APPLICATIONS_FETCH_FINISHED',
  getApplicationByIdStarted: 'APPLICATION_BY_ID_FETCH_STARTED',
  getApplicationByIdFinished: 'APPLICATION_BY_ID_FETCH_FINISHED'
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
  },
  getApplicationById: function (id) {
    let service = new ApplicationsService();
    dispatcher.dispatch(new ActionResponse(null, actions.getApplicationByIdStarted));

    service.getApplicationById(id)
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getApplicationByIdFinished, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getApplicationByIdFinished));
      });
  }
};
