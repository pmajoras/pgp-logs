'use strict';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Panel } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';
import { deepCopy, scrollTo } from '../../helpers/generic-helper';
import AppPanel from '../../components/common/AppPanel.jsx';
import ApplicationGrokFields from './ApplicationGrokFields.jsx';
import ApplicationsService from '../../services/applications/ApplicationsService';
const applicationMessage = messageHelper.get('APPLICATION');
const nameMessage = messageHelper.get('NAME');
const appIdMessage = messageHelper.get('APPID');
const descriptionMessage = messageHelper.get('DESCRIPTION');
const logPatternMessage = messageHelper.get('LOGPATTERN');
const saveMessage = messageHelper.get('SAVE');
const editMessage = messageHelper.get('EDIT');
const deleteMessage = messageHelper.get('DELETE');
const cancelMessage = messageHelper.get('CANCEL');
const grokService = new ApplicationsService();

class ApplicationContainerHeader extends React.Component {
  constructor(props) {
    super(props);
    let application = this.props.application.toJS();
    let isOldApplication = !!application._id;

    this.state = {
      _application: application,
      isEditing: !isOldApplication,
      startedEditing: !isOldApplication,
      isCollapsed: isOldApplication
    };
  }

  componentDidMount() {
    this.checkFocus();
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('ApplicationContainerHeader >> componentWillReceiveProps >> Start');
    console.log('ApplicationContainerHeader >> componentWillReceiveProps >>', nextProps.application && nextProps.application !== this.props.application);
    if (nextProps.application && nextProps.application !== this.props.application) {
      this.setState({ _application: nextProps.application.toJS() });
    }
    console.log('ApplicationContainerHeader >> componentWillReceiveProps >> Finish');
  }

  componentDidUpdate() {
    console.log('ApplicationContainerHeader >> componentDidUpdate >> Start');
    this.checkFocus();
    console.log('ApplicationContainerHeader >> componentDidUpdate >> Finish');
  }

  checkFocus() {
    if (this.state.isEditing && this.state.startedEditing) {
      let domElement = ReactDOM.findDOMNode(this.refs.appIdInput);

      // Needs to trigger the setTimeout because when the focus/select are called, the Collapse animation has not been runned.
      // So the input element not visible yet.
      setTimeout(() => {
        domElement.focus();
        domElement.select();
        scrollTo(domElement);
      }, 100);

      this.setState({ startedEditing: false });
    }
  }

  @autobind
  handleEditClick(e) {
    console.log('ApplicationContainerHeader >> handleEditClick >> Start');
    e.stopPropagation();
    this.setState({ isEditing: true, startedEditing: true, isCollapsed: false });
    console.log('ApplicationContainerHeader >> handleEditClick >> Finish');
  }

  @autobind
  handleToggleClick() {

    if (this.state.isCollapsed || !this.state.isEditing) {
      this.setState({ isCollapsed: !this.state.isCollapsed });
    }
  }

  @autobind
  handleCancelClick(e) {
    console.log('ApplicationContainerHeader >> handleCancelClick >> Start');
    e.stopPropagation();
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel(this.state._application);
    }
    this.setState({ isEditing: false, isCollapsed: true, _application: this.props.application.toJS() });
    console.log('ApplicationContainerHeader >> handleCancelClick >> Finish');
  }

  @autobind
  handleDeleteClick(e) {
    console.log('ApplicationContainerHeader >> handleDeleteClick >> Start');
    e.stopPropagation();
    if (typeof this.props.onDelete === 'function') {
      this.props.onDelete(this.props.application.get('_id'));
    }
    console.log('ApplicationContainerHeader >> handleDeleteClick >> Start');
  }

  @autobind
  handleSaveClick() {
    console.log('ApplicationContainerHeader >> handleSaveClick >> Start');
    if (typeof this.props.onSave === 'function') {
      this.props.onSave(this.state._application._id, this.state._application);
    }
    this.setState({ isEditing: false });
    console.log('ApplicationContainerHeader >> handleSaveClick >> Finish');
  }

  @autobind
  handleInputChange(e) {
    console.log('ApplicationContainerHeader >> handleInputChange >> Start');
    let propertyName = e.target.dataset.propName;
    this.state._application[propertyName] = e.target.value;
    this.setState({ _application: this.state._application });
    console.log('ApplicationContainerHeader >> handleInputChange >> Finish');
  }

  @autobind
  handleLogPatternBlur() {
    console.log('ApplicationContainerHeader >> handleLogPatternBlur >> Start');
    grokService.getGrokFields(this.state._application.logPattern)
      .then((data) => {
        console.log('ApplicationContainerHeader >> handleLogPatternBlur >> getGrokFields', data);
        this.state._application.fields = data;
        this.setState({ _application: this.state._application });
      });
    console.log('ApplicationContainerHeader >> handleLogPatternBlur >> Finish');
  }

  @autobind
  isSaveEnabled() {
    return this.state._application.appId && this.state._application.name && this.state._application.logPattern;
  }

  render() {
    console.log('ApplicationContainerHeader >> render >> Start');
    let application = this.state._application;
    let isEditing = this.state.isEditing;
    let isOpen = !this.state.isCollapsed;
    let toolbarButtons, saveButton;
    let collapseAccordionClass = isOpen ? 'fa-chevron-up' : 'fa-chevron-down';
    let opts = {};

    if (isEditing) {
      saveButton = (
        <button type="button" class="button button-primary button-small" disabled={!this.isSaveEnabled()} onClick={this.handleSaveClick}>
          {saveMessage}
          <i class="fa fa-floppy-o margin-left" aria-hidden="true"></i>
        </button>);
      toolbarButtons = (
        <button type="button" class="button button-primary button-small" onClick={this.handleCancelClick}>
          {cancelMessage}
          <i class="fa fa-times margin-left" aria-hidden="true"></i>
        </button>);
    }
    else {
      opts['readOnly'] = 'readOnly';
      saveButton = null;
      toolbarButtons = (
        <div>
          <button type="button" class="button button-primary button-small" onClick={this.handleEditClick}>
            {editMessage}
            <i class="fa fa-pencil margin-left" aria-hidden="true"></i>
          </button>
          <span class="margin-left"></span>
          <button type="button" class="button button-caution button-small" onClick={this.handleDeleteClick}>
            {deleteMessage}
            <i class="fa fa-trash margin-left" aria-hidden="true"></i>
          </button>
        </div>);
    }

    console.log('ApplicationContainerHeader >> render >> Finish');
    return (
      <div class="row">
        <div class="col-sm-4">
          {toolbarButtons}
        </div>
        <div class="col-sm-8" onClick={this.handleToggleClick}>
          <a class="text-uppercase" href="javascript:;">{application.appId}- {application.name}</a>
          <i class={`fa fa-2x ${collapseAccordionClass} pull-right`} aria-hidden="true"></i>
        </div>
        <div class="col-sm-12 margin-top">
          <Panel collapsible expanded={isOpen}>
            <form class="form">
              <div class="form-group margin-right">
                <label for="test">{appIdMessage}: </label>
                <input ref="appIdInput" type="text" value={application.appId} onChange={this.handleInputChange} data-prop-name="appId" class="form-control" placeholder={appIdMessage}  {...opts}></input>
              </div>
              <div class="form-group margin-right">
                <label>{nameMessage}: </label>
                <input type="text" value={application.name} onChange={this.handleInputChange} data-prop-name="name" class="form-control" placeholder={nameMessage}  {...opts}></input>
              </div>
              <div class="form-group margin-right">
                <label>{logPatternMessage}: </label>
                <textarea value={application.logPattern}
                  onBlur={this.handleLogPatternBlur}
                  onChange={this.handleInputChange}
                  data-prop-name="logPattern"
                  class="form-control" placeholder={logPatternMessage}  {...opts}>
                </textarea>
              </div>
              <div class="form-group margin-right">
                <ApplicationGrokFields fields={application.fields} logPattern={application.logPattern}></ApplicationGrokFields>
              </div>
              <div class="form-group margin-right">
                <label>{descriptionMessage}: </label>
                <textarea
                  style={{ height: '100px' }}
                  type="text"
                  value={application.description}
                  onChange={this.handleInputChange}
                  data-prop-name="description"
                  class="form-control" placeholder={descriptionMessage}  {...opts}>
                </textarea>
              </div>
              <div class="form-group margin-right">
                {saveButton}
              </div>
            </form>
          </Panel>
        </div>
      </div>);
  }
}


ApplicationContainerHeader.PropTypes = {
  application: React.PropTypes.object.isRequired
};

export default ApplicationContainerHeader;
