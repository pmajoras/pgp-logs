"use strict";
import React from "react";
import LogMessages from "./LogMessages.jsx";
import Messages from "../../messages/messages-pt-br";

class LogMessagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages || [];
    const headerMessage = Messages.generic.showing + " " + messages.length + " mensagens.";

    return (
      <div class="panel panel-primary">
        <div class="panel-heading">{headerMessage}</div>
        <div class="panel-body">
          <LogMessages messages={messages}/>
        </div>
      </div>
    );
  }
}

export default LogMessagesContainer;