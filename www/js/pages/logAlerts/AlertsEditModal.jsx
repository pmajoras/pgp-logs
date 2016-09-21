'use strict';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import reactIdGenerator from '../../helpers/react-id-generator';
import { Modal } from 'react-bootstrap';
import ToolbarColumn from '../../components/custom-table/ToolbarColumn.jsx';
import AlertRule from './AlertRule.jsx';
import autobind from 'autobind-decorator';

class AlertsEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: this.props.alert || this.getNewAlert()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert && nextProps.alert !== this.state.alert) {
      this.setState({ alert: nextProps.alert });
    }
  }

  getNewAlert() {
    return {
      isNew: true,
      name: '',
      description: '',
      rules: [this.getNewRule()]
    };
  }

  getNewRule() {
    return {
      operator: 'contains',
      logicalOperator: 'or',
      expectedValue: '',
      ignoreCase: false
    };
  }

  isAlertValid(alert) {
    let isValid = false;

    if (alert && alert.name && Array.isArray(alert.rules) && alert.rules.length > 0) {
      let rulesAreValid = true;
      alert.rules.forEach((rule) => {

        if (!rule.expectedValue || !rule.operator) {
          rulesAreValid = false;
        }
      });

      isValid = rulesAreValid;
    }

    return isValid;
  }

  @autobind
  handleEditEnded() {
    if (this.props.onEditEnded) {
      this.props.onEditEnded();
    }
  }

  @autobind
  handleSave() {
    let alert = this.state.alert;
    if (this.isAlertValid(alert)) {

      if (this.props.onSave) {
        this.props.onSave(alert);
      }
      this.handleEditEnded();
    }
  }

  @autobind
  handleAddRule() {
    this.state.alert.rules.push(this.getNewRule());
    this.setState({ alert: this.state.alert });
  }

  @autobind
  handleInputChange(e) {
    let propertyName = e.target.dataset.propName;
    this.state.alert[propertyName] = e.target.value;
    this.setState({ alert: this.state.alert });
  }

  render() {
    let showModal = this.props.showModal === true;
    let alert = this.state.alert;
    let isNewAlert = this.state.alert.isNewAlert;
    let titleMessage = isNewAlert ? 'Adicionando Alerta' : 'Editando Alerta';

    let rules = alert.rules.map((rule, index) => {
      return <AlertRule key={index} rule={rule}></AlertRule>;
    });

    let rulesContainer = (
      <div>
        <div class="margin-bottom">
          <OverlayTrigger placement="top" overlay={<Tooltip id={reactIdGenerator.getId() }>Adicionar Regra</Tooltip>}>
            <button type="button" onClick={this.handleAddRule} class="button button-primary button-square button-small">
              <i class="fa fa-plus"></i>
            </button>
          </OverlayTrigger>
        </div>
        <h3>
          Regras do Alerta
        </h3>
        {rules}
      </div>
    );

    return (
      <Modal bsSize="large" show={showModal} onHide={this.handleEditEnded}>
        <Modal.Header closeButton>
          <Modal.Title>{titleMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class={`form-group ${alert.name ? '' : 'has-error'}`}>
              <label class="control-label" for="alertEditName">Nome</label>
              <input type="text" value={alert.name} onChange={this.handleInputChange} data-prop-name="name" class="form-control" id="alertEditName" placeholder="Nome"></input>
            </div>
            <div class={`form-group ${alert.description ? '' : 'has-error'}`}>
              <label class="control-label" for="alertEditDescription">Descrição</label>
              <input type="text" value={alert.description} onChange={this.handleInputChange} data-prop-name="description" class="form-control" id="alertEditDescription" placeholder="Descrição"></input>
            </div>
            {rulesContainer}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.handleEditEnded} class="button button-primary pull-left">
            Cancel
          </button>
          <button onClick={this.handleSave} class="button button-primary">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AlertsEditModal.propTypes = {
  showModal: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  onEditEnded: React.PropTypes.func,
  onSave: React.PropTypes.func,
  alert: React.PropTypes.object
};

export default AlertsEditModal;
