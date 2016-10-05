'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';
import AppPanel from '../../components/common/AppPanel.jsx';
import ApplicationContainerHeader from './ApplicationContainerHeader.jsx';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
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

  render() {
    console.log('ApplicationContainer >> render >> Start');
    let application = this.props.application;
    let headerMessage = applicationMessage + ' - ' + application.get('appId');

    console.log('ApplicationContainer >> render >> Finish');
    return (
      <AppPanel headerMessage={headerMessage} headerSize="sm">
        <ApplicationContainerHeader application={application} onSave={this.handleSave} onCancel={this.handleCancel}>
        </ApplicationContainerHeader>
      </AppPanel>);
  }
}

ApplicationContainer.PropTypes = {
  application: React.PropTypes.object.isRequired
};

export default ApplicationContainer;
