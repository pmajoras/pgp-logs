'use strict';
import React from 'react';
import Loader from "react-loader";
import autobind from 'autobind-decorator';
import GenericError from '../../components/common/GenericError.jsx';
import ApplicationsEditStore from '../../stores/applications/ApplicationsEditStore';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
import editModes from '../../constants/edit-modes';
import AppText from '../../components/common/AppText.jsx';
import AppForm from '../../components/common/AppForm.jsx';
import {applicationsEdit, errors} from '../../messages/messages-pt-br';

const store = ApplicationsEditStore;

class ApplicationsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationId: this.props.params.applicationId,
      storeState: store.getState(),
      hasError: store.hasErrorOnLoad(),
      isLoading: store.isLoading(),
      hasSaveErrors: store.hasSaveErrors(),
      mode: store.getMode()
    };

    this.validation = {
      name: {
        errors: {
          isRequired: errors.generic.isRequiredError()
        },
        rules: {
          isRequired: true
        }
      },
      appId: {
        errors: {
          isRequired: errors.generic.isRequiredError()
        },
        rules: {
          isRequired: true
        }
      },
      logPattern: {
        errors: {
          isRequired: errors.generic.isRequiredError()
        },
        rules: {
          isRequired: true
        }
      }
    };
  }

  componentWillMount() {
    store.addChangeListener(this.handleEditChangeState);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleEditChangeState);
  }

  componentDidMount() {
    ApplicationsActions.getApplicationById(this.state.applicationId, editModes.edit);
  }

  @autobind
  handleEditChangeState() {

    this.setState({
      storeState: store.getState(),
      hasError: store.hasErrorOnLoad(),
      isLoading: store.isLoading(),
      hasSaveErrors: store.hasSaveErrors(),
      mode: store.getMode()
    });
  }

  @autobind
  handleFormSubmit(data) {
    console.log("data", data);
  }

  getData() {
    var data = this.state.storeState.get('data');

    if (data) {
      data = data.toJS();
      data.logPattern = data.logPattern[0];
    }
    else {
      data = {};
    }

    return data;
  }

  render() {
    const {name, appId, logPattern} = this.validation;
    let data = this.getData();
    let hasError = this.state.hasError;
    let isLoading = this.state.isLoading;

    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<GenericError></GenericError>);
    }

    return (
      <AppForm ref="applicationEditForm" onFormSubmit={this.handleFormSubmit}>
        <div class="form-group">
          <AppText
            required
            mustFocus
            hintText={applicationsEdit.nameLabel}
            id="applicationName"
            type="text"
            name="name"
            value={data.name}
            floatingLabelText={applicationsEdit.nameLabel}
            validationErrors={name.errors}
            validations={name.rules}/>
        </div>
        <div class="form-group">
          <AppText
            required
            hintText={applicationsEdit.appIdLabel}
            id="applicationAppId"
            type="text"
            name="appId"
            value={data.appId}
            floatingLabelText={applicationsEdit.appIdLabel}
            validationErrors={appId.errors}
            validations={appId.rules}/>
        </div>
        <div class="form-group">
          <AppText
            required
            hintText={applicationsEdit.logPatternLabel}
            id="applicationLogPattern"
            type="text"
            name="logPattern"
            value={data.logPattern}
            floatingLabelText={applicationsEdit.logPatternLabel}
            validationErrors={logPattern.errors}
            validations={logPattern.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText={applicationsEdit.descriptionLabel}
            id="description"
            type="text"
            value={data.description}
            name="description"
            floatingLabelText={applicationsEdit.descriptionLabel}/>
        </div>
      </AppForm>
    );
  }
}

ApplicationsEdit.PropTypes = {
  params: React.PropTypes.object.isRequired
};

export default ApplicationsEdit;
