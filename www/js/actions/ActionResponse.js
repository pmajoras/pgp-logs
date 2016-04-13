"use strict";
class ActionResponse {

  constructor(error, actionType, payload) {
    this.type = actionType;
    this.payload = payload;
    this.err = error;
  }
}

module.exports = ActionResponse;