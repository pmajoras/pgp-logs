'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';
const emptyMessage = messageHelper.get('APPLICATIONS_EMPTY');
const registerRequestMessage = messageHelper.get('APPLICATIONS_REGISTER_REQUEST');
const applicationsCreateMessage = messageHelper.get('APPLICATIONS_CREATE');

const NoApplicationsFound = () => {
  return (<div><h2>{emptyMessage}</h2> <h3>{registerRequestMessage}</h3></div>);
};

const ApplicationsList = (applications) => {
  return (<div></div>);
};

class ApplicationsListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: this.props.applications || []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('ApplicationsListContainer >> componentWillReceiveProps >> Start');

    if (nextProps.applications !== this.state.applications) {
      this.setState({ applications: nextProps.applications });
    }

    console.log('ApplicationsListContainer >> componentWillReceiveProps >> Finish');
  }

  @autobind
  handleAddClick() {
    console.log('ApplicationsListContainer >> handleAddClick >> Start');

    console.log('ApplicationsListContainer >> handleAddClick >> Finish');
  }

  render() {
    console.log('ApplicationsListContainer >> render >> Start');

    const applications = this.state.applications;
    let content;

    if (applications.length === 0) {
      content = <NoApplicationsFound></NoApplicationsFound>;
    }
    else {
      content = <ApplicationsList></ApplicationsList>;
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
