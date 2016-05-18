"use strict";
import dispatcher from "../../dispatcher";
import ActionResponse from "../ActionResponse";
import LogMessagesService from "../../services/log-messages/LogMessagesService";

var actions = {
  getLogMessages: "GET_LOG_MESSAGES",
};

module.exports = {
  actions: actions,
  getLogMessages: function () {
    let service = new LogMessagesService();

    service.getLogMessages()
      .then((data) => {
        console.log("data", data);
        dispatcher.dispatch(new ActionResponse(null, actions.getLogMessages, data));
      })
      .catch((err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getLogMessages));
      });
  }
};
