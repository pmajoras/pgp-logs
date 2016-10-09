'use strict';
import dispatcher from '../../dispatcher';
import ActionResponse from '../ActionResponse';
import ApplicationsService from '../../services/applications/ApplicationsService';
import editModes from '../../constants/edit-modes';
import reactIdGenerator from '../../helpers/react-id-generator';

var actions = {
  addEmptyApplication: 'ADD_EMPTY_APPLICATION',
  cancelEmptyApplication: 'CANCEL_EMPTY_APPLICATION',
  deleteApplicationByIdStarted: 'DELETE_APPLICATION_STARTED',
  deleteApplicationByIdFinished: 'DELETE_APPLICATION_FINISHED',
  getApplicationsStarted: 'APPLICATIONS_FETCH_STARTED',
  getApplicationsFinished: 'APPLICATIONS_FETCH_FINISHED',
  getApplicationByIdStarted: 'APPLICATION_BY_ID_FETCH_STARTED',
  getApplicationByIdFinished: 'APPLICATION_BY_ID_FETCH_FINISHED',
  resetEditApplication: 'RESET_EDIT_APPLICATION',
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
  resetEditApplication: function () {
    dispatcher.dispatch(new ActionResponse(null, actions.resetEditApplication));
  },
  deleteApplication: function (id) {
    let service = new ApplicationsService();
    dispatcher.dispatch(new ActionResponse(null, actions.deleteApplicationByIdStarted));

    service.deleteApplication(id)
      .then(() => {
        dispatcher.dispatch(new ActionResponse(null, actions.deleteApplicationByIdFinished, id));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.deleteApplicationByIdFinished));
      });
  },
  saveApplication: function (application, id) {
    let service = new ApplicationsService();
    dispatcher.dispatch(new ActionResponse(null, actions.saveApplicationStarted, application));

    service.saveApplication(application, id)
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.saveApplicationFinished, { data: data, mode: editModes.edit, tempId: application.tempId }));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.saveApplicationFinished));
      });
  },
  cancelEmptyApplication: function (application) {
    dispatcher.dispatch(new ActionResponse(null, actions.cancelEmptyApplication, application.tempId));
  },
  addEmptyApplication: function () {
    let emptyApplicationData = {
      appId: '',
      name: '',
      description: '',
      logPattern: '',
      alerts: [],
      tempId: reactIdGenerator.getId()
    };

    dispatcher.dispatch(new ActionResponse(null, actions.addEmptyApplication, emptyApplicationData));
  }
};
