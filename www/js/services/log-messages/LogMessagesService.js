'use strict';
var q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').logMessages;

class LogMessagesService extends BaseService {
  constructor() {
    super();
  }

  getLogMessages() {

    return this.handleApiPromise(client.read())
      .then((data) => {
        return q(data);
      })
      .catch((err) => {
        return q.reject(err);
      });
  }

  getLogFields() {
    return this.handleApiPromise(client.fields.read())
      .then((data) => {
        return q(data);
      })
      .catch((err) => {
        return q.reject(err);
      });
  }
}

module.exports = LogMessagesService;
