'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';
import ApplicationsService from '../../services/applications/ApplicationsService';
import editModes from '../../constants/edit-modes';

var actions = {
  getApplicationsStarted: 'APPLICATIONS_FETCH_STARTED',
  getApplicationsFinished: 'APPLICATIONS_FETCH_FINISHED',
  getApplicationByIdStarted: 'APPLICATION_BY_ID_FETCH_STARTED',
  getApplicationByIdFinished: 'APPLICATION_BY_ID_FETCH_FINISHED',
  saveApplicationStarted: 'SAVE_APPLICATION_STARTED',
  saveApplicationFinished: 'SAVE_APPLICATION_FINISHED'
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
  getApplicationById: function (id, mode) {
    mode = mode || editModes.view;
    let service = new ApplicationsService();
    dispatcher.dispatch(new ActionResponse(null, actions.getApplicationByIdStarted));

    service.getApplicationById(id)
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getApplicationByIdFinished, { data: data, mode: mode }));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getApplicationByIdFinished));
      });
  },
  saveApplication: function (application, id) {
    let service = new ApplicationsService();
    dispatcher.dispatch(new ActionResponse(null, actions.saveApplicationStarted));

    service.saveApplication(application, id)
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.saveApplicationFinished, { data: data, mode: mode }));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.saveApplicationFinished));
      });
  }
};
