"use strict";
import React from "react";
import Loader from "react-loader";
import SearchContainer from "../components/common/SearchContainer.jsx";
import LogMessagesContainer from "../components/log-messages/LogMessagesContainer.jsx";
import LogMessagesStore from "../stores/log-messages/LogMEssagesStore";
import LogMessagesActions from "../actions/log-messages/LogMessagesActions";

const store = LogMessagesStore;

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessagesRefresh = this.handleMessagesRefresh.bind(this);

    this.state = {
      messages: store.getMessages() || [],
      isLoaded: false
    };
  }

  componentWillMount() {
    store.addChangeListener(this.handleMessagesRefresh);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleMessagesRefresh);
  }

  componentDidMount() {
    LogMessagesActions.getLogMessages();
  }

  handleMessagesRefresh() {
    this.setState({ messages: store.getMessages(), isLoaded: true });
  }

  render() {
    const messages = this.state.messages;

    return (
      <div>
        <SearchContainer/>
        <Loader loaded={this.state.isLoaded}>
          <LogMessagesContainer messages={messages} />
        </Loader>
      </div>
    );
  }
}
