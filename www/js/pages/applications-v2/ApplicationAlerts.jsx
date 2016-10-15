'use strict';
import React, { PropTypes } from 'react';
import * as ReactDOM from 'react-dom';
import reactIdGenerator from '../../helpers/react-id-generator';
import { Popover, Overlay } from 'react-bootstrap';
import * as messageHelper from '../../helpers/message-helper';
import reactColorGenerator from '../../helpers/react-color-generator';
import AppPanel from '../../components/common/AppPanel.jsx';
import autobind from 'autobind-decorator';
import AlertsEditModal from '../logAlerts/AlertsEditModal.jsx';
import LogAlertsModal from '../logAlerts/LogAlertsModal.jsx';
import AlertToolBar from './AlertToolBar.jsx';
import ApplicationAlertsChart from './ApplicationAlertsChart.jsx';
import ApplicationsActions from '../../actions/applications/ApplicationsActions';
const emptyMessage = messageHelper.get('ALERTS_EMPTY');
const registerRequestMessage = messageHelper.get('ALERTS_REGISTER_REQUEST');
const alertsCreateMessage = messageHelper.get('ALERTS_CREATE');
const alertsManageMessage = messageHelper.get('ALERTS_MANAGE');

const AlertsToolBarPopover = ({ alerts, onEdit, onDelete }) => {
  let content;

  if (!alerts || alerts.size === 0) {
    content = (<div style={{ width: '360px' }} class="text-center">{emptyMessage}</div>);
  }
  else {
    content = (
      <ul style={{ width: '360px' }} class="list-group">
        {alerts.map((alert, index) =>
          <li class="list-group-item">
            <AlertToolBar onEdit={onEdit} onDelete={onDelete} key={index} alert={alert}></AlertToolBar>
          </li>)}
      </ul>);
  }

  return (content);
};

const NoAlertsFound = () => {
  return (<div><h2>{emptyMessage}</h2> <h3>{registerRequestMessage}</h3></div>);
};

const propTypes = {
  alerts: React.PropTypes.object.isRequired,
  fields: React.PropTypes.object,
  onDeleteAlert: React.PropTypes.func
};

class ApplicationAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      editingRow: null,
      showLogAlertsModal: false,
      logAlertRow: null,
      isPopoverOpen: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('ApplicationAlerts >> shouldComponentUpdate >> Start');

    let componentShouldUpdate = this.props.alerts !== nextProps.alerts ||
      this.props.fields !== nextProps.fields ||
      this.state.showEditModal !== nextState.showEditModal ||
      this.state.editingRow !== nextState.editingRow ||
      this.state.isPopoverOpen !== nextState.isPopoverOpen ||
      this.state.showLogAlertsModal !== nextState.showLogAlertsModal ||
      this.state.logAlertRow !== nextState.logAlertRow;

    console.log('ApplicationAlerts >> shouldComponentUpdate >>', componentShouldUpdate);
    console.log('ApplicationAlerts >> shouldComponentUpdate >> Finish');
    return componentShouldUpdate;
  }

  @autobind
  handleAddClick() {
    console.log('ApplicationAlerts >> handleAddClick >> Start');
    this.handleEditClick(null);
    console.log('ApplicationAlerts >> handleAddClick >> Finish');
  }

  @autobind
  handleEditClick(alert) {
    console.log('ApplicationAlerts >> handleEditClick >> Start');
    this.setState({
      showEditModal: true,
      editingRow: alert,
      isPopoverOpen: false
    });
    console.log('ApplicationAlerts >> handleEditClick >> Finish');
  }

  @autobind
  handleDeleteClick(alert) {
    console.log('ApplicationAlerts >> handleDeleteClick >> Start');
    if (typeof this.props.onDeleteAlert === 'function') {
      this.props.onDeleteAlert(alert);
    }
    console.log('ApplicationAlerts >> handleDeleteClick >> Finish');
  }

  @autobind
  handleEditEnded() {
    console.log('ApplicationAlerts >> handleEditEnded >> Start');
    this.setState({ editingRow: null, showEditModal: false });
    console.log('ApplicationAlerts >> handleEditEnded >> Finish');
  }

  @autobind
  handleSave(alert) {
    console.log('ApplicationAlerts >> handleSave >> Start');
    if (typeof this.props.onSaveAlert === 'function') {
      this.props.onSaveAlert(alert);
    }
    console.log('ApplicationAlerts >> handleSave >> Finish');
  }

  @autobind
  togglePopoverVisibility() {
    this.setState({ isPopoverOpen: !this.state.isPopoverOpen });
  }

  @autobind
  handleAlertChartClick(alertElement) {
    this.setState({ showLogAlertsModal: true, logAlertRow: alertElement });
  }

  @autobind
  handleLogAlertModalClose() {
    this.setState({ showLogAlertsModal: false });
  }

  render() {
    console.log('ApplicationAlerts >> render >> Start', this.props.alerts);
    const alerts = this.props.alerts;
    const fields = this.props.fields ? this.props.fields.toJS() : [];
    const showEditModal = this.state.showEditModal;

    let content;
    if (alerts.size === 0) {
      content = <NoAlertsFound></NoAlertsFound>;
    }
    else {
      content =
        <ApplicationAlertsChart alerts={alerts} onChartClick={this.handleAlertChartClick}>
        </ApplicationAlertsChart>;
    }

    console.log('ApplicationAlerts >> render >> Finish');
    return (
      <div>
        <div class="margin-bottom">
          <button class="button button-primary button-small" onClick={this.handleAddClick}>
            {alertsCreateMessage}
            <i class="fa fa-plus margin-left" aria-hidden="true"></i>
          </button>
          <span class="margin-left"></span>
          <button ref="btnManageAlerts" onClick={this.togglePopoverVisibility} class="button button-primary button-small">
            {alertsManageMessage}
            <i class="fa fa-pencil margin-left" aria-hidden="true"></i>
          </button>
          <Overlay
            show={this.state.isPopoverOpen}
            target={() => ReactDOM.findDOMNode(this.refs.btnManageAlerts)}
            placement="bottom">
            <Popover id={reactIdGenerator.getId()} title="Alerts">
              <AlertsToolBarPopover alerts={alerts} onEdit={this.handleEditClick} onDelete={this.handleDeleteClick}></AlertsToolBarPopover>
            </Popover>
          </Overlay>
        </div>
        {content}
        <AlertsEditModal alert={this.state.editingRow} fields={fields} onSave={this.handleSave} onEditEnded={this.handleEditEnded} showModal={showEditModal}>
        </AlertsEditModal>
        <LogAlertsModal alert={this.state.logAlertRow} showModal={this.state.showLogAlertsModal} onClose={this.handleLogAlertModalClose}>
        </LogAlertsModal>
      </div>
    );
  }
}

ApplicationAlerts.propTypes = propTypes;

export default ApplicationAlerts;
