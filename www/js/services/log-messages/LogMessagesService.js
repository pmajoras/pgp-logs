"use strict";
var Q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').logMessages;

class LogMessagesService extends BaseService {
  constructor() {
    super();
  }

  getLogMessages() {

    return this.handleApiPromise(client.read())
      .then((data) => {
        return Q(data);
      })
      .catch((err) => {
        return Q.reject(err);
      });
  }

  getLogFields() {
    return Q({
      fields: ["_teste", "_teste1", "_teste2"]
    });
  }
}

module.exports = LogMessagesService;