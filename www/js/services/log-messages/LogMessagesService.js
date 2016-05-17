"use strict";
var Q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').logMessages;

class LogMessagesService extends BaseService {
  constructor() {
    super();
  }

  getLogMessages() {
    let deferred = Q.defer();

    return this.handleApiPromise(client.read())
      .then((data) => {
        return Q(data);
      })
      .catch((err) => {
        return Q.reject(err);
      });
  }
}

module.exports = LogMessagesService;