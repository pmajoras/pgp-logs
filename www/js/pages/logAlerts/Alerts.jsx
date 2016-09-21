'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import reactRouterHelper from '../../helpers/react-router-helper';
import Loader from "react-loader";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import GenericError from '../../components/common/GenericError.jsx';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
import AppPanel from '../../components/common/AppPanel.jsx';
import ApplicationsListStore from '../../stores/applications/ApplicationsListStore';
import ApplicationsEditStore from '../../stores/applications/ApplicationsEditStore';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
import AlertsTable from './AlertsTable.jsx';

const store = ApplicationsListStore;
const editStore = ApplicationsEditStore;

export default class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listState: store.getState(),
      isLoading: false,
      hasError: false,
      selectedAppid: this.props.params.applicationId
    };
  }

  componentWillMount() {
    editStore.addChangeListener(this.handleEditChangeState);
    editStore.addSaveFinishedListener(this.handleSaveFinishedListener);
    store.addChangeListener(this.handleListChangeState);
  }

  componentWillUnmount() {
    editStore.removeChangeListener(this.handleEditChangeState);
    editStore.removeSaveFinishedListener(this.handleSaveFinishedListener);
    store.removeChangeListener(this.handleListChangeState);
  }

  componentDidMount() {
    ApplicationsActions.getApplications();
  }

  @autobind
  handleSelectChange(e) {
    this.setState({ selectedAppid: e.target.value });
  }

  @autobind
  handleListChangeState() {
    console.log("test handleListChangeState");
    this.setState({
      listState: store.getState(),
      hasError: store.hasError(),
      isLoading: store.isLoading() || editStore.isLoading()
    });
  }

  @autobind
  handleSaveFinishedListener() {
    console.log("test handleSaveFinishedListener");
    // TODO Remove this uggly timeout.
    setTimeout(function () {
      ApplicationsActions.getApplications();
    }, 0);
  }

  @autobind
  handleEditChangeState() {
    this.setState({
      isLoading: store.isLoading() || editStore.isLoading()
    });
  }

  render() {
    let data = this.state.listState.get('data').toJS();
    let hasError = this.state.hasError;
    let isLoading = this.state.isLoading;
    let selectedAppId = this.state.selectedAppid;
    let selectedApp = null;

    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<GenericError></GenericError>);
    }

    if (!data || data.length === 0) {
      return (<h2>No applications found!</h2>);
    }

    let options = data.map((application, index) => {
      return <option key={index} value={application._id}>{application.name}</option>;
    });

    if (selectedAppId) {
      selectedApp = data.find((value) => value._id === selectedAppId);
    } else {
      selectedApp = data[0];
    }

    console.log("Alerts.jsx render", data);
    return (
      <AppPanel headerMessage="Alertas">
        <div class="margin-bottom">
          <select class="form-control" value={selectedApp ? selectedApp._id : -20} id="applications-alerts-cbo" onChange={this.handleSelectChange }>
            { options }
          </select>
        </div>
        <AlertsTable application={selectedApp}>
        </AlertsTable>
      </AppPanel>
    );
  }
}
