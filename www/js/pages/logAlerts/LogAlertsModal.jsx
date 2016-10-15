'use strict';
import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import reactIdGenerator from '../../helpers/react-id-generator';
import * as messageHelper from '../../helpers/message-helper';
import { Modal } from 'react-bootstrap';
import Loader from 'react-loader';
import LogAlert from './LogAlert.jsx';
import autobind from 'autobind-decorator';
import LogAlertsService from '../../services/log-alerts/LogAlertsService';
const titleTemplate = messageHelper.get('LOG_ALERTS_MODAL_TITLE_TEMPLATE');
const logAlertsService = new LogAlertsService();

class LogAlertsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      logAlerts: [],
      lastLoadedId: ''
    };
  }

  componentDidMount() {
    console.log('LogAlertsModal >> componentDidMount >> Start');
    this.updateLogAlertsData();
    console.log('LogAlertsModal >> componentDidMount >> Finish');
  }

  componentDidUpdate() {
    console.log('LogAlertsModal >> componentDidUpdate >> Start');
    this.updateLogAlertsData();
    console.log('LogAlertsModal >> componentDidUpdate >> Finish');
  }

  updateLogAlertsData() {
    let alert = this.props.alert;
    if (alert && alert._id !== this.state.lastLoadedId) {
      this.setState({ isLoading: true, lastLoadedId: alert._id, logAlerts: [] });

      logAlertsService.getLogAlertsByAlertId(alert._id)
        .then(this.handleLoadedLogAlerts)
        .catch(this.handleErrorLogAlerts)
        .finally(() => { this.setState({ isLoading: false }); });
    }
  }

  @autobind
  handleLoadedLogAlerts(alerts) {
    console.log('LogAlertsModal >> handleLoadedLogAlerts >> Start');
    console.log('alerts', alerts);

    console.log('LogAlertsModal >> handleLoadedLogAlerts >> Finish');
  }

  @autobind
  handleErrorLogAlerts(err) {
    console.log('LogAlertsModal >> handleErrorLogAlerts >> Err', err);
  }

  @autobind
  handleClose() {
    console.log('LogAlertsModal >> handleClose >> Start');
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
    console.log('LogAlertsModal >> handleClose >> Finish');
  }

  render() {
    let showModal = this.props.showModal === true;
    let titleMessage = this.props.alert ? titleTemplate.replace('[ALERT]', this.props.alert.name) : '';
    let logAlerts = this.state.logAlerts.map((logAlert, index) => {
      return <LogAlert key={index} logAlert={logAlert}></LogAlert>;
    });

    return (
      <Modal bsSize="large" show={showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Loader loaded={!this.state.isLoading}>
            {logAlerts}
          </Loader>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

LogAlertsModal.propTypes = {
  showModal: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  alert: React.PropTypes.object
};

export default LogAlertsModal;
