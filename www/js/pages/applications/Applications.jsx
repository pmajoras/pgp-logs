'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import reactRouterHelper from '../../helpers/react-router-helper';
import reactIdGenerator from '../../helpers/react-id-generator';
import Loader from "react-loader";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import GenericError from '../../components/common/GenericError.jsx';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
import AppPanel from '../../components/common/AppPanel.jsx';
import ApplicationsListStore from '../../stores/applications/ApplicationsListStore';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';

const store = ApplicationsListStore;

export default class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listState: store.getState()
    };
  }

  componentWillMount() {
    store.addChangeListener(this.handleListChangeState);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleListChangeState);
  }

  componentDidMount() {
    ApplicationsActions.getApplications();
  }

  @autobind
  handleEdit(event, row) {
    reactRouterHelper.redirectToState('applications', row._id);
  }

  @autobind
  handleDelete(event, row) {
    ApplicationsActions.deleteApplication(row._id);
  }

  @autobind
  handleAdd() {
    reactRouterHelper.redirectToState('applications', 'new');
  }

  @autobind
  handleListChangeState() {
    console.log("handleListChangeState!!", this.state.listState.get('data').toJS());
    this.setState({
      listState: store.getState(),
      hasError: store.hasError(),
      isLoading: store.isLoading()
    });
  }

  render() {
    let data = this.state.listState.get('data').toJS();
    let hasError = this.state.hasError;
    let isLoading = this.state.isLoading;

    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<GenericError></GenericError>);
    }

    const tableToolBar = (cell, row) => <ToolbarColumn row={row} onEditClick={this.handleEdit} onDeleteClick={this.handleDelete}></ToolbarColumn>;

    return (
      <AppPanel headerMessage="Aplicações">
        <div class="margin-bottom">
          <OverlayTrigger placement="top" overlay={<Tooltip id={reactIdGenerator.getId() }>TEdwqdqw</Tooltip>}>
            <button onClick={this.handleAdd} class="button button-primary button-square button-small">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </OverlayTrigger>
        </div>
        <BootstrapTable data={data} pagination={true}>
          <TableHeaderColumn dataField="_id" isKey={true}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField="appId">AppId</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Nome</TableHeaderColumn>
          <TableHeaderColumn dataField="description">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataFormat={tableToolBar} width="100"></TableHeaderColumn>
        </BootstrapTable>
      </AppPanel>
    );
  }
}
