'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';
import ApplicationContainer from './ApplicationContainer.jsx';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
const emptyMessage = messageHelper.get('APPLICATIONS_EMPTY');
const registerRequestMessage = messageHelper.get('APPLICATIONS_REGISTER_REQUEST');
const applicationsCreateMessage = messageHelper.get('APPLICATIONS_CREATE');

const NoApplicationsFound = () => {
  return (<div><h2>{emptyMessage}</h2> <h3>{registerRequestMessage}</h3></div>);
};

const ApplicationsList = ({applications}) => {
  let applicationsList = applications.map((application) => <ApplicationContainer application={application}></ApplicationContainer>);
  return (<div>{applicationsList}</div>);
};

class ApplicationsListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('ApplicationsListContainer >> shouldComponentUpdate >> Start');
    console.log('ApplicationsListContainer >> shouldComponentUpdate >>', this.props.applications !== nextProps.applications);
    console.log('ApplicationsListContainer >> shouldComponentUpdate >> Finish');
    return this.props.applications !== nextProps.applications;
  }

  @autobind
  handleAddClick() {
    console.log('ApplicationsListContainer >> handleAddClick >> Start');
    ApplicationsActions.addEmptyApplication();
    console.log('ApplicationsListContainer >> handleAddClick >> Finish');
  }

  render() {
    console.log('ApplicationsListContainer >> render >> Start');

    const applications = this.props.applications;
    let content;

    if (applications.length === 0) {
      content = <NoApplicationsFound></NoApplicationsFound>;
    }
    else {
      content = <ApplicationsList applications={applications}></ApplicationsList>;
    }

    console.log('ApplicationsListContainer >> render >> Finish');
    return (
      <div>
        <div class="margin-bottom">
          <button class="button button-primary button-small" onClick={this.handleAddClick}>
            {applicationsCreateMessage}
            <i class="fa fa-plus margin-left" aria-hidden="true"></i>
          </button>
        </div>
        {content}
      </div>
    );
  }
}

ApplicationsListContainer.PropTypes = {
  applications: React.PropTypes.array.isRequired
};

export default ApplicationsListContainer;
