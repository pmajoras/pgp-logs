"use strict";
import React from "react";
import LogMessages from "./LogMessages.jsx";
import AppPanel from "../common/AppPanel.jsx";
import Messages from "../../messages/messages-pt-br";

class LogMessagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages || [];
    const headerMessage = Messages.generic.showing + " " + messages.length + " mensagens.";

    return (
      <AppPanel headerMessage={headerMessage}>
        <LogMessages messages={messages}/>
      </AppPanel>
    );
  }
}

export default LogMessagesContainer;