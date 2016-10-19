'use strict';
import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import reactIdGenerator from '../../helpers/react-id-generator';
import * as messageHelper from '../../helpers/message-helper';
import reactRouterHelper from '../../helpers/react-router-helper';
import { Modal } from 'react-bootstrap';
import Loader from 'react-loader';
import LogAlert from './LogAlert.jsx';
import autobind from 'autobind-decorator';
import LogAlertsService from '../../services/log-alerts/LogAlertsService';
const titleTemplate = messageHelper.get('LOG_ALERTS_MODAL_TITLE_TEMPLATE');
const logCountTemplate = messageHelper.get('SHOW_LOGS_COUNT');
const noDataMesssage = messageHelper.get('NO_DATA');
const logAlertsService = new LogAlertsService();

const LogAlerts = ({logAlerts}) => {
  let content = null;

  if (logAlerts && logAlerts.size > 0) {
    logAlerts = logAlerts.map((logAlert, index) => {
      return <LogAlert key={index} logAlert={logAlert}></LogAlert>;
    });
    content = (<ul class="list-group">{logAlerts}</ul>);
  }
  else {
    content = (<h2>{noDataMesssage}</h2>);
  }

  return content;
};

class LogAlertsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('LogAlertsModal >> shouldComponentUpdate >> Start');
    console.log('LogAlertsModal >> shouldComponentUpdate >>', this.props.logAlerts !== nextProps.logAlerts || this.props.isLoading !== nextProps.isLoading);
    console.log('LogAlertsModal >> shouldComponentUpdate >> Finish');
    return this.props.logAlerts !== nextProps.logAlerts || this.props.isLoading !== nextProps.isLoading;
  }

  @autobind
  handleClose() {
    console.log('LogAlertsModal >> handleClose >> Start');
    reactRouterHelper.redirectToState('applications');
    console.log('LogAlertsModal >> handleClose >> Finish');
  }

  render() {
    let titleMessage = titleTemplate;
    let isLoading = this.props.isLoading || false;
    let logAlertsCount = this.props.logAlerts ? this.props.logAlerts.size : 0;
    let logAlertsCountMessage = logAlertsCount > 0 ? logCountTemplate.replace('[COUNT]', logAlertsCount) : '';

    return (
      <Modal bsSize="large" show={true} onHide={this.handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{titleMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Loader loaded={!isLoading}>
            <div>
              <h3>
                {logAlertsCountMessage}
              </h3>
            </div>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <LogAlerts logAlerts={this.props.logAlerts || []}>
              </LogAlerts>
            </div>
          </Loader>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

LogAlertsModal.propTypes = {
  logAlerts: React.PropTypes.object,
  isLoading: React.PropTypes.bool
};

export default LogAlertsModal;
