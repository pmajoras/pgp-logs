'use strict';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import reactIdGenerator from '../../helpers/react-id-generator';
import {actionToolbar} from '../../messages/messages-pt-br';

@autobind
class ToolbarColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  handleEditClick(event) {
    if (typeof this.props.onEditClick === 'function') {
      this.props.onEditClick(event, this.props.row);
    }
  }

  handleDeleteClick(event) {
    if (typeof this.props.onDeleteClick === 'function') {
      this.props.onDeleteClick(event, this.props.row);
    }
  }

  render() {
    const actions = [];
    const getActionKey = () => actions.length + 1;

    if (this.props.isEditVisible === true) {
      const editToolTipMessage = this.props.addMessageTooltip || actionToolbar.editTooltip;
      const editToolTip = (<Tooltip id={reactIdGenerator.getId() }>{editToolTipMessage}</Tooltip>);
      actions.push(
        <OverlayTrigger key={getActionKey() } placement="top" overlay={editToolTip}>
          <button onClick={this.handleEditClick} style={{ 'marginRight': 10 }} class="button button-action button-square button-small">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
        </OverlayTrigger>);
    }

    if (this.props.isDeleteVisible === true) {
      const deleteToolTipMessage = this.props.addMessageTooltip || actionToolbar.deleteTooltip;
      const deleteToolTip = (<Tooltip id={reactIdGenerator.getId() }>{deleteToolTipMessage}</Tooltip>);
      actions.push(
        <OverlayTrigger key={getActionKey() } placement="top" overlay={deleteToolTip}>
          <button onClick={this.handleDeleteClick} style={{ 'marginRight': 10 }} class="button button-caution button-square button-small">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </OverlayTrigger>);
    }

    return (<div>{actions}</div>);
  }
}

ToolbarColumn.PropTypes = {
  isDeleteVisible: React.PropTypes.bool,
  isEditVisible: React.PropTypes.bool,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
  row: React.PropTypes.object.isRequired
};

ToolbarColumn.defaultProps = {
  isEditVisible: true,
  isDeleteVisible: true
};

export default ToolbarColumn;
