'use strict';
import React from 'react';
import * as messageHelper from '../../helpers/message-helper';

class AppMessage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let message = messageHelper.get(this.props.messageKey);
    return <span>{message}</span>;
  }
}

AppMessage.PropTypes = {
  messageKey: React.PropTypes.string.isRequired
};

export default AppMessage;
