'use strict';
import React from 'react';
import Loader from "react-loader";
import autobind from 'autobind-decorator';
import GenericError from '../../components/common/GenericError.jsx';
import ApplicationsEditStore from '../../stores/applications/ApplicationsEditStore';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
import editModes from '../../constants/edit-modes';

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

  render() {
    let data = this.state.storeState.get('data');
    let hasError = this.state.hasError;
    let isLoading = this.state.isLoading;

    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<GenericError></GenericError>);
    }

    return (
      <div>
        {this.state.applicationId}
        <br/>
      </div>
    );
  }
}

ApplicationsEdit.PropTypes = {
  params: React.PropTypes.object.isRequired
};

export default ApplicationsEdit;
