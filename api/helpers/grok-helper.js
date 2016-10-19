'use strict';
const patterns = require('node-grok').loadDefaultSync();
const Q = require('q');
const uuid = require('node-uuid');

class GrokUtil {
  constructor() {

  }

  getFields(grokPatternStr) {
    let fields = [];

    try {
      let grokPattern = patterns.createPattern(grokPatternStr);
      fields = grokPattern.fields.filter((field) => field !== null);
    }
    catch (error) {
      console.log('Error on creating fields for grokPatternStr >>', grokPatternStr);
      console.log('Error >> ', error);
    }

    return fields;
  }

  compileMessage(grokPatternStr, message) {
    let deferred = Q.defer();

    try {
      let grokPattern = patterns.createPattern(grokPatternStr);
      grokPattern.parse(message, function (err, obj) {
        if (!err) {
          deferred.resolve(obj);
        }
        else {
          console.log('Error on parsing grokPatter with message', grokPatternStr, message);
          console.log('Error', err);
          deferred.resolve({});
        }
      });
    }
    catch (error) {
      console.log('Error on createing grokPattern >>', grokPatternStr);
      console.log('Error >> ', error);
      return Q.resolve({});
    }

    return deferred.promise;
  }

  compileLogMessages(grokPatternStr, logMessages) {
    if (!grokPatternStr || !Array.isArray(logMessages) || logMessages.length === 0) {
      return Q.resolve({});
    }
    let timer = uuid.v1();
    console.time(timer);
    console.log('compileLogMessages >> Start >>', logMessages.length);

    let compilePromises = [];
    logMessages.forEach((logMessage) => {
      compilePromises.push(this.compileMessage(grokPatternStr, logMessage.message));
    });

    return Q.all(compilePromises)
      .then((compiledMessages) => {
        let i = 0;
        for (i = 0; i < compiledMessages.length; i++) {
          logMessages[i].compiledMessage = compiledMessages[i];
        }

        console.timeEnd(timer);
        return logMessages;
      });
  }
}

module.exports = new GrokUtil();


