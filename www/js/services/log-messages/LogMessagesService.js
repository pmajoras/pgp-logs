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
    return this.handleApiPromise(client.fields.read())
      .then((data) => {
        return Q(data);
      })
      .catch((err) => {
        return Q.reject(err);
      });
  }
}

module.exports = LogMessagesService;