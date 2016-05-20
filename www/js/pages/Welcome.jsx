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
      fields: store.getFields() || []
    };
  }

  componentWillMount() {
    store.addChangeListener(this.handleMessagesRefresh);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleMessagesRefresh);
  }

  componentDidMount() {
    LogMessagesActions.getLogMessagesAndFields();
  }

  handleMessagesRefresh() {
    this.setState({ messages: store.getMessages(), fields: store.getFields() });
  }

  render() {
    const messages = this.state.messages;

    return (
      <div>
        <SearchContainer/>
        <div class="row">
          <div class="col-md-3 col-sm-12">
          </div>
          <div class="col-md-9 col-sm-12">
            <LogMessagesContainer messages={messages} />
          </div>
        </div>
      </div>
    );
  }
}
