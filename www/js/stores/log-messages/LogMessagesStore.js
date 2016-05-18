"use strict";
const BaseStore = require('../BaseStore');
const dispatcher = require("../../dispatcher").default;
const logMessagesActions = require("../../actions/log-messages/LogMessagesActions");

class LogMessagesStore extends BaseStore {
  constructor() {
    super({
      messages: []
    });
  }

  handleLoadedMessages(err, payload) {

    if (!err) {
      this.mergeState({ messages: payload });
    }
    else {
      this.resetState();
    }
  }

  getMessages() {
    return this.getState().get("messages");
  }

  /**
   * Handles the store actions.
   */
  handleActions(action) {
    switch (action.type) {
      case logMessagesActions.actions.getLogMessages: {
        this.handleLoadedMessages(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    // If action was responded to, emit change event    
    this.emitChange();
    return true;
  }

}

const logMessagesStore = new LogMessagesStore();
dispatcher.register(logMessagesStore.handleActions.bind(logMessagesStore));

module.exports = logMessagesStore;
