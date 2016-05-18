"use strict";
import React from "react";
import LogMessageField from "./LogMessageField.jsx";

class LogMessage extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    const messageFields = [];

    for (var key in this.props.message) {
      let name = key;
      let value = this.props.message[key];
      messageFields.push(<LogMessageField name={key} value={value}/>);
    }

    return (
      <div>
        {messageFields}
      </div>
    );
  }
}

LogMessage.propTypes = { message: React.PropTypes.object };

export default LogMessage;