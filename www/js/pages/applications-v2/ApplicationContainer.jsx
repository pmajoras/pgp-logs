'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';
import AppPanel from '../../components/common/AppPanel.jsx';
import ApplicationContainerHeader from './ApplicationContainerHeader.jsx';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
import ApplicationAlerts from './ApplicationAlerts.jsx';
const applicationMessage = messageHelper.get('APPLICATION');

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('ApplicationContainer >> shouldComponentUpdate >> Start');
    console.log('ApplicationContainer >> shouldComponentUpdate >>', this.props.application !== nextProps.application);
    console.log('ApplicationContainer >> shouldComponentUpdate >> Finish');
    return this.props.application !== nextProps.application;
  }

  @autobind
  handleSaveAlert(alert) {
    console.log('ApplicationContainer >> handleSaveAlert >> Start', alert);
    let application = this.props.application.toJS();
    let alerts = application.alerts || [];

    if (alert.isNew) {
      delete alert.isNew;
      alerts.push(alert);
    } else {
      let updatedAlertIndex = alerts.findIndex((appAlert) => appAlert._id === alert._id);
      if (updatedAlertIndex > -1) {
        alerts[updatedAlertIndex] = alert;
      }
    }

    application.alerts = alerts;
    this.handleSave(application._id, application);
    console.log('ApplicationContainer >> handleSaveAlert >> Finish');
  }

  @autobind
  handleDeleteAlert(alert) {
    console.log('ApplicationContainer >> handleDeleteAlert >> Start', alert);
    let application = this.props.application.toJS();
    let alerts = application.alerts || [];

    let deleteAlertIndex = alerts.findIndex((appAlert) => appAlert._id === alert._id);
    if (deleteAlertIndex > -1) {
      alerts.splice(deleteAlertIndex, 1);
    }

    application.alerts = alerts;
    this.handleSave(application._id, application);
    console.log('ApplicationContainer >> handleDeleteAlert >> Finish');
  }

  @autobind
  handleSave(applicationId, application) {
    console.log('ApplicationContainer >> handleSave >> Start');
    ApplicationsActions.saveApplication(application, applicationId);
    console.log('ApplicationContainer >> handleSave >> Finish');
  }

  @autobind
  handleCancel(application) {
    console.log('ApplicationContainer >> handleCancel >> Start', application);
    if (!application._id) {
      ApplicationsActions.cancelEmptyApplication(application);
    }
    console.log('ApplicationContainer >> handleCancel >> Finish');
  }

  @autobind
  handleDelete(applicationId) {
    console.log('ApplicationContainer >> handleDelete >> Start', applicationId);
    ApplicationsActions.deleteApplication(applicationId);
    console.log('ApplicationContainer >> handleDelete >> Finish');
  }

  render() {
    console.log('ApplicationContainer >> render >> Start');
    let application = this.props.application;
    let headerMessage = applicationMessage + ' - ' + application.get('appId');

    let alertsContent = null;
    if (!application.get('tempId')) {
      alertsContent = (
        <ApplicationAlerts alerts={application.get('alerts') }
          fields={application.get('fields') }
          applicationName={application.get('name') }
          onSaveAlert={this.handleSaveAlert}
          onDeleteAlert={this.handleDeleteAlert}>
        </ApplicationAlerts>);
    }

    console.log('ApplicationContainer >> render >> Finish');
    return (
      <AppPanel headerMessage={headerMessage} headerSize="sm">
        <ApplicationContainerHeader application={application} onSave={this.handleSave} onCancel={this.handleCancel} onDelete={this.handleDelete}>
        </ApplicationContainerHeader>
        {alertsContent}
      </AppPanel>);
  }
}

ApplicationContainer.PropTypes = {
  application: React.PropTypes.object.isRequired
};

export default ApplicationContainer;
