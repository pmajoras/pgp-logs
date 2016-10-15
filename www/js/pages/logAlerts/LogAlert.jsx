'use strict';
import React from 'react';
import * as messageHelper from '../../helpers/message-helper';

class LogAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.logAlert !== nextProps.logAlert;
  }

  render() {
    console.log('LogAlert >> render >> Start');
    let logAlert = this.props.logAlert;


    console.log('LogAlert >> render >> Finish');
    return (
      <div>
      </div>
    );
  }
}

LogAlert.propTypes = {
  logAlert: React.PropTypes.object.isRequired
};

export default LogAlert;
