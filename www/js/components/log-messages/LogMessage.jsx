"use strict";
import React from "react";
import LogMessageField from "./LogMessageField.jsx";

class LogMessage extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    let messageFields = [];

    Object.getOwnPropertyNames(this.props.message).forEach((val, idx) => {
      let name = val;
      let value = this.props.message[val];
      if (typeof value !== 'string') {
        value = '';
      }
      messageFields.push(<LogMessageField key={idx} name={name} value={value}/>);
    });

    return (
      <li class="log-message list-group-item">
        {messageFields}
      </li>
    );
  }
}

LogMessage.propTypes = { message: React.PropTypes.object };

export default LogMessage;
