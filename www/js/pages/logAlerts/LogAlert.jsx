'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import { Panel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as messageHelper from '../../helpers/message-helper';
import reactIdGenerator from '../../helpers/react-id-generator';
import LogAlertsActions from '../../actions/log-alerts/LogAlertsActions';
import moment from 'moment';
const dateMessage = messageHelper.get('PROCESSED_DATE');
const idMessage = messageHelper.get('ID');
const dateFormat = messageHelper.get('DATE_FORMAT');
const logMessage = messageHelper.get('LOG_MESSAGE');
const noCompiledMessage = messageHelper.get('NO_COMPILED_OBJECT');
const compiledMessageTitle = messageHelper.get('COMPILED_MESSAGE_TITLE');
const clipBoardMessage = messageHelper.get('COPY_MESSAGE_CLIPBOARD');
const resolveMessage = messageHelper.get('CLICK_RESOLVE_LOG_ALERT');

const LogAlertCompiled = ({ compiledMessage }) => {
  let content = null;

  if (compiledMessage) {
    content = [];
    Object.getOwnPropertyNames(compiledMessage).forEach((val, idx) => {
      let name = val;
      let value = compiledMessage[name];
      if (typeof value !== 'string') {
        value = '';
      }
      content.push(<div key={idx}><span class="label label-info">{name}</span>: {value}</div>);
    });
  }
  else {
    content = <h4>{noCompiledMessage}</h4>;
  }

  return <div>{content}</div>;
};

class LogAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompiledMessageOpen: true,
      isSelected: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldComponentUpdate = this.props.logAlert !== nextProps.logAlert ||
      this.state.isCompiledMessageOpen !== nextState.isCompiledMessageOpen ||
      this.state.isSelected !== nextState.isSelected;
    return shouldComponentUpdate;
  }

  @autobind
  toggleCollapse() {
    this.setState({ isCompiledMessageOpen: !this.state.isCompiledMessageOpen });
  }

  @autobind
  toggleSelection() {
    this.setState({ isSelected: !this.state.isSelected });
  }

  @autobind
  select() {
    console.log('LogAlert >> select >> Start');
    this.setState({ isSelected: true });
    console.log('LogAlert >> select >> Finish');
  }

  @autobind
  handleResolveClick() {
    console.log('LogAlert >> handleResolveClick >> Start');
    let logAlertId = this.props.logAlert.get('_id');
    let alertId = this.props.logAlert.get('alertId');
    LogAlertsActions.resolveLogAlertById(alertId, logAlertId);
    console.log('LogAlert >> handleResolveClick >> Finish');
  }

  render() {
    let logAlert = this.props.logAlert;
    let isSelected = this.state.isSelected;
    let isCompiledPanelOpen = this.state.isCompiledMessageOpen;
    let collapseAccordionClass = isCompiledPanelOpen ? 'fa-chevron-up' : 'fa-chevron-down';
    let logAlertTextId = 'log-alert-message-' + logAlert.get('_id');
    let listCss = isSelected ? 'list-group-item-info' : '';

    return (
      <li class={`list-group-item ${listCss}`}>
        <div class="row">
          <div class="col-sm-1 col-xs-1">
            <input style={{ cursor: 'pointer', width: '30px', height: '30px', marginTop: '0' }} type="checkbox" class="form-control margin-right" checked={isSelected} onChange={this.toggleSelection} />
          </div>
          <div class="col-sm-1 col-xs-1">
            <OverlayTrigger placement="top" overlay={<Tooltip id={reactIdGenerator.getId()}>{resolveMessage}</Tooltip>}>
              <button onClick={this.handleResolveClick} class="button button-action button-square button-small"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button>
            </OverlayTrigger>
          </div>
          <div class="col-sm-5 col-xs-12 margin-top">
            <h4 class="list-group-item-heading">
              {idMessage}: <span class="label label-info">{logAlert.get('_id')}</span>
            </h4>
          </div>
          <div class="col-sm-5 col-xs-12 margin-top">
            <h4 class="list-group-item-heading">
              {dateMessage}: <span class="label label-info">{moment(logAlert.get('alertDate')).format(dateFormat)}</span>
            </h4>
          </div>
        </div>
        <div class="row margin-top">
          <div class="col-sm-12">
            <span class="margin-right">
              {logMessage}:
            </span>
            <OverlayTrigger placement="top" overlay={<Tooltip id={reactIdGenerator.getId()}>{clipBoardMessage}</Tooltip>}>
              <i data-clipboard="" data-clipboard-target={'#' + logAlertTextId} style={{ cursor: 'pointer' }} class="fa fa-files-o" aria-hidden="true"></i>
            </OverlayTrigger>
          </div>
          <div class="col-sm-12">
            <textarea id={logAlertTextId} type="text" readOnly class="form-control" value={logAlert.get('message')}></textarea>
          </div>
        </div>
        <div class="row margin-top">
          <div class="col-sm-12">
            <div onClick={this.toggleCollapse} style={{ cursor: 'pointer' }} class="text-center">
              <i class={`fa margin-right ${collapseAccordionClass}`} aria-hidden="true"></i>
              <a href="javascript:;">{compiledMessageTitle}</a>
            </div>
            <Panel collapsible expanded={isCompiledPanelOpen}>
              <LogAlertCompiled compiledMessage={logAlert.get('compiledMessage')}>
              </LogAlertCompiled>
            </Panel>
          </div>
        </div>
      </li>
    );
  }
}

LogAlert.propTypes = {
  logAlert: React.PropTypes.object.isRequired
};

export default LogAlert;
