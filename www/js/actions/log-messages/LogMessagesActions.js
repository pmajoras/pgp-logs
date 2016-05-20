"use strict";
import dispatcher from "../../dispatcher";
import ActionResponse from "../ActionResponse";
import LogMessagesService from "../../services/log-messages/LogMessagesService";

var actions = {
  getLogMessages: "GET_LOG_MESSAGES",
  getLogFields: "GET_LOG_FIELDS"
};

module.exports = {
  actions: actions,
  getLogMessages: function () {
    let service = new LogMessagesService();

    service.getLogMessages()
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getLogMessages, data));
      })
      .catch((err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getLogMessages));
      });
  },
  getLogFields: function () {
    let service = new LogMessagesService();

    service.getLogFields()
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getLogFields, data));
      })
      .catch((err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getLogFields));
      });
  },
  getLogMessagesAndFields: function () {

    service.getLogMessages()
      .then((messagesData) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getLogMessages, messagesData));

        service.getLogFields()
          .then((fieldsData) => {
            dispatcher.dispatch(new ActionResponse(null, actions.getLogFields, fieldsData));
          })
          .catch((err) => {
            dispatcher.dispatch(new ActionResponse(err, actions.getLogFields));
          });
      })
      .catch((err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getLogMessages));
      });
  }
};
