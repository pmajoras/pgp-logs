'use strict';
import React from 'react';
import autobind from 'autobind-decorator';
import * as messageHelper from '../../helpers/message-helper';

const propTypes = {
  alert: React.PropTypes.object.isRequired
};

class AlertContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('AlertContainer >> render >> Start');
    const alert = this.props.alert;

    console.log('AlertContainer >> render >> Finish', alert);
    return (
      <div>
      </div>
    );
  }
}

AlertContainer.PropTypes = propTypes;

export default AlertContainer;
