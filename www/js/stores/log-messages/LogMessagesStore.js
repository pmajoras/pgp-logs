'use strict';
const BaseStore = require('../BaseStore');
const dispatcher = require('../../dispatcher').default;
const logMessagesActions = require('../../actions/log-messages/LogMessagesActions');

class LogMessagesStore extends BaseStore {
  constructor() {
    super({
      messages: [],
      fields: []
    });
  }

  handleLoadedMessages(err, payload) {

    if (!err) {
      this.mergeState({ messages: payload });
    }
    else {
      this.mergeState({ messages: [] });
    }

    this.emitChange();
  }

  handleLoadedFields(err, payload) {

    if (!err) {
      this.mergeState({ fields: payload });
    }
    else {
      this.mergeState({ fields: [] });
    }
  }

  getMessages() {
    let test = this.getState().get('messages').toJS();
    return this.getState().get('messages').toJS().map((message) => message._source);
  }

  getFields() {
    return this.getState().get('fields').toArray();
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
      case logMessagesActions.actions.getLogFields: {
        this.handleLoadedFields(action.err, action.payload);
        break;
      }
      default:
        return true;
    }

    return true;
  }
}

const logMessagesStore = new LogMessagesStore();
dispatcher.register(logMessagesStore.handleActions.bind(logMessagesStore));

module.exports = logMessagesStore;
