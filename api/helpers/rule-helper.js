'use strict';
const Q = require('q');
const mongoose = require('mongoose');
const uuid = require('node-uuid');

function isRuleAppliedToMessage(rule, message, compiledObject) {
  let isRuleApplied = false;

  if (rule && message) {
    message = message.toUpperCase();
    let valueToCompare = message;

    if (rule.field && compiledObject) {
      let compiledObjectFieldValue = compiledObject[rule.field];
      valueToCompare = (compiledObjectFieldValue || valueToCompare).toUpperCase();
    }

    if (rule.operator === 'contains') {
      isRuleApplied = valueToCompare.indexOf(rule.expectedValue.toUpperCase()) > -1;
    }
    else if (rule.operator === 'higher') {

      try {
        let intValueToCompare = parseInt(valueToCompare);
        let intExpectedValue = parseInt(rule.expectedValue);
        isRuleApplied = intValueToCompare > intExpectedValue;
      }
      catch (error) {
        console.log('errHigher', error);
        isRuleApplied = false;
      }
    }
    else {
      isRuleApplied = valueToCompare === rule.expectedValue.toUpperCase();
    }
  }

  return isRuleApplied;
}

module.exports = {
  isRuleAppliedToMessage: isRuleAppliedToMessage,
  getLogAlertsToSave: function (userId, appId, alerts, logMessages) {
    let alertsToInsert = [];
    let timer = uuid.v1();

    console.time(timer);
    console.log('getLogAlertsToSave >> Start >>', logMessages.length);

    logMessages.forEach((logMessage) => {

      alerts.forEach((alert) => {

        for (var i = 0; i < alert.rules.length; i++) {
          if (isRuleAppliedToMessage(alert.rules[i], logMessage.message, logMessage.compiledMessage)) {
            alertsToInsert.push({
              alert: alert,
              logAlert: {
                userId: mongoose.Types.ObjectId(userId),
                alertId: alert._id,
                appId: appId,
                message: logMessage.message,
                compiledMessage: logMessage.compiledMessage,
                logId: logMessage.logId,
                alertDate: new Date()
              }
            });
            break;
          }
        }
      });
    });

    console.timeEnd(timer);
    return Q.resolve(alertsToInsert);
  }
};
