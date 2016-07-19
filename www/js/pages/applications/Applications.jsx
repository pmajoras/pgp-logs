'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import reactRouterHelper from '../../helpers/react-router-helper';
import Loader from "react-loader";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
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
  handleListChangeState() {
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
      return (<div>hasError</div>);
    }

    const tableToolBar = (cell, row) => <ToolbarColumn row={row} onEditClick={this.handleEdit} isDeleteVisible={false}></ToolbarColumn>;

    return (
      <BootstrapTable data={data} pagination={true}>
        <TableHeaderColumn dataField="_id" isKey={true}>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="appId">AppId</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Nome</TableHeaderColumn>
        <TableHeaderColumn dataField="description">Descrição</TableHeaderColumn>
        <TableHeaderColumn dataFormat={tableToolBar} width="100"></TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
