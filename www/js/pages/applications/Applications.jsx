'use strict';
import React from 'react';
import Loader from "react-loader";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
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
    let data = this.state.listState.get('data').toJS();
    let hasError = this.state.listState.get('hasError');
    let isLoading = this.state.listState.get('isLoading');

    if (isLoading === true) {
      return (<Loader loaded={!isLoading}></Loader>);
    }

    if (hasError === true) {
      return (<div>hasError</div>);
    }

    let format = () => {
      var addToolTip = (<Tooltip>Adicionar registro!</Tooltip>);
      var editToolTip = (<Tooltip>Edit registro!</Tooltip>);

      return (
        <div>
          <OverlayTrigger placement="left" overlay={addToolTip}>
            <button style={{ 'marginRight': 10 }} class="button button-primary button-square button-small"><i class="fa fa-plus"></i></button>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={editToolTip}>
            <button style={{ 'marginRight': 10 }} class="button button-primary button-square button-small"><i class="fa fa-pencil-square-o"></i></button>
          </OverlayTrigger>
        </div>);
    };

    return (
      <BootstrapTable data={data} pagination={true}>
        <TableHeaderColumn dataField="_id" isKey={true}>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="appId">AppId</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Nome</TableHeaderColumn>
        <TableHeaderColumn dataField="description">Descrição</TableHeaderColumn>
        <TableHeaderColumn dataFormat={format}></TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
