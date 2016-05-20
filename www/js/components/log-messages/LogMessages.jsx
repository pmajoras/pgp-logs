"use strict";
import React from "react";
import LogMessage from "./LogMessage.jsx";

class LogMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages || [];
    const logMessages = messages.map((message, index) => {
      return <LogMessage key={index} message={message}/>;
    });

    return (
      <ul class="list-group">
        {logMessages}
      </ul>
    );
  }
}

//LogMessages.propTypes = { messages: React.PropTypes.object };

export default LogMessages;