"use strict";
import React from "react";
import SearchContainer from "../components/common/SearchContainer.jsx";
import LogMessagesStore from "../stores/log-messages/LogMEssagesStore";
import LogMessagesActions from "../actions/log-messages/LogMessagesActions";

const store = LogMessagesStore;

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessagesRefresh = this.handleMessagesRefresh.bind(this);

    this.state = {
      messages: store.getMessages()
    };
    
    LogMessagesActions.getLogMessages();
  }

  componentWillMount() {
    store.addChangeListener(this.handleMessagesRefresh);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleMessagesRefresh);
  }

  handleMessagesRefresh() {
    this.setState({ messages: store.getMessages() });
  }

  render() {
    const messagesTest = JSON.stringify(this.state.messages);

    return (
      <div>
        <SearchContainer/>
        {messagesTest}
      </div>
    );
  }
}
