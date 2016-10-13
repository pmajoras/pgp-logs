'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';

const propTypes = {
  alert: React.PropTypes.object.isRequired,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func
};

class AlertToolBar extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('AlertToolBar >> shouldComponentUpdate >> Start');
    console.log('AlertToolBar >> shouldComponentUpdate >>', this.props.alert !== nextProps.alert);
    console.log('AlertToolBar >> shouldComponentUpdate >> Finish');
    return this.props.alert !== nextProps.alert;
  }

  @autobind
  handleEditClick() {
    console.log('AlertToolBar >> handleEditClick >> Start');
    if (typeof this.props.onEdit === 'function') {
      this.props.onEdit(this.props.alert.toJS());
    }
    console.log('AlertToolBar >> handleEditClick >> Finish');
  }

  @autobind
  handleDeleteClick() {
    console.log('AlertToolBar >> handleDeleteClick >> Start');
    if (typeof this.props.onDelete === 'function') {
      this.props.onDelete(this.props.alert.toJS());
    }
    console.log('AlertToolBar >> handleDeleteClick >> Finish');
  }

  render() {
    console.log('AlertToolBar >> render >> Start');
    const alert = this.props.alert;
    let alertName = alert.get('name');
    if (alertName.length > 20) {
      alertName = alertName.substring(0, 19) + '...';
    }

    console.log('AlertToolBar >> render >> Finish', alert);
    return (
      <div>
        <span style={{ width: '150px', display: 'inline-block' }}>
          {alertName}
        </span>
        <span clas="margin-left">
          <button class="button button-primary button-small" onClick={this.handleEditClick}>
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button class="button button-caution button-small margin-left" onClick={this.handleDeleteClick}>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </span>
      </div>
    );
  }
}

AlertToolBar.PropTypes = propTypes;

export default AlertToolBar;
