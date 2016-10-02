'use strict';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
import reactIdGenerator from '../../helpers/react-id-generator';
import autobind from 'autobind-decorator';
import AlertsEditModal from './AlertsEditModal.jsx';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
import * as $ from 'jquery';

class AlertsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingRow: null,
      showEditModal: false
    };
  }

  @autobind
  handleEdit(event, row) {
    this.setState({ editingRow: $.extend(true, {}, row), showEditModal: true });
    console.log('edit >> row', row);
  }

  @autobind
  handleAdd() {
    this.setState({ editingRow: null, showEditModal: true });
  }

  @autobind
  handleEditEnded() {
    this.setState({ editingRow: null, showEditModal: false });
  }

  @autobind
  handleSave(alert) {
    let application = this.props.application;
    let alerts = application.alerts || [];

    if (alert.isNew) {
      delete alert.isNew;
      alerts.push(alert);
    } else {
      let updatedAlertIndex = alerts.findIndex((appAlert) => appAlert._id === alert._id);
      if (updatedAlertIndex > -1) {
        alerts[updatedAlertIndex] = alert;
      }
    }

    application.alerts = alerts;
    ApplicationsActions.saveApplication(application, application._id);
  }

  @autobind
  handleDelete(event, row) {
    let application = this.props.application;
    let deleteAlertIndex = application.alerts.findIndex((appAlert) => appAlert._id === row._id);

    if (deleteAlertIndex > -1) {
      application.alerts.splice(deleteAlertIndex, 1);
      ApplicationsActions.saveApplication(application, application._id);
    }
  }

  render() {
    let application = this.props.application;
    let alerts = [];
    let fields = [];

    if (application) {
      fields = application.fields || [];
      if (application.alerts && application.alerts.length > 0) {
        alerts = application.alerts;
      }
    }

    let showModal = this.state.showEditModal;

    const tableToolBar = (cell, row) => <ToolbarColumn row={row} onEditClick={this.handleEdit} onDeleteClick={this.handleDelete}></ToolbarColumn>;
    console.log("alertsTable render");
    return (
      <div>
        <div class="margin-bottom">
          <OverlayTrigger placement="top" overlay={<Tooltip id={reactIdGenerator.getId() }>Adicionar Alerta</Tooltip>}>
            <button onClick={this.handleAdd} class="button button-primary button-square button-small">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </OverlayTrigger>
        </div>
        <BootstrapTable data={alerts} pagination={true}>
          <TableHeaderColumn dataField="_id" isKey={true}>Nome</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Nome</TableHeaderColumn>
          <TableHeaderColumn dataField="description">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataFormat={tableToolBar} width="100"></TableHeaderColumn>
        </BootstrapTable>
        <AlertsEditModal alert={this.state.editingRow} fields={fields} onSave={this.handleSave} onEditEnded={this.handleEditEnded} showModal={showModal}>
        </AlertsEditModal>
      </div>
    );
  }
}

AlertsTable.propTypes = {
  application: React.PropTypes.object
};

export default AlertsTable;
