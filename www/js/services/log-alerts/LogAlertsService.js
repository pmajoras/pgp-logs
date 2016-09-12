'use strict';
var q = require('q');
var BaseService = require('../BaseService');
//var client = require('../JqueryRestClientService').logMessages;

class LogAlertsService extends BaseService {
  constructor() {
    super();
  }

  getApplicationLogAlerts() {

    return q(
    [
      {
        id: '1',
        appId: 'appTest',
        alerts: [{
          name: 'alertType1',
          description: 'this alert occurs when there is error in the message.',
          quantity: 10
        },{
          name: 'alertType2',
          description: 'this alert occurs when there is warning in the message.',
          quantity: 5
        }]
      },
      {
        id: '2',
        appId: 'secondAppTest',
        alerts: [{
          name: 'alertType3',
          description: 'this alert occurs when there is error in the message2.',
          quantity: 10
        },
        {
          name: 'alertType4',
          description: 'this alert occurs when there is warning in the message2.',
          quantity: 0
        }]
      }
    ]);
  }
}

module.exports = LogAlertsService;
