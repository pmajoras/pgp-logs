const patterns = require('node-grok').loadDefaultSync();
const Q = require('q');

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
}

module.exports = new GrokUtil();


