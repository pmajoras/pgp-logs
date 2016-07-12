'use strict';
import React from 'react';
import Loader from "react-loader";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ApplicationsListStore from '../../stores/applications/ApplicationsListStore';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';

const store = ApplicationsListStore;

export default class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.handleListChangeState = this.handleListChangeState.bind(this);
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

  handleListChangeState() {
    this.setState({
      listState: store.getState()
    });
  }

  render() {
    var data = this.state.listState.get('data').toJS();
    var hasError = this.state.listState.get('hasError');
    var isLoading = this.state.listState.get('isLoading');

    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<div>hasError</div>);
    }

    return (
      <BootstrapTable data={data} pagination={true}>
        <TableHeaderColumn dataField="_id" isKey={true}>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="appId">AppId</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Nome</TableHeaderColumn>
        <TableHeaderColumn dataField="description">Descrição</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
