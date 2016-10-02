const patterns = require('node-grok').loadDefaultSync();

class GrokUtil {
  constructor() {

  }

  getFields(grokPatternStr) {
    let fields = [];

    try {
      let grokPattern = patterns.createPattern(grokPatternStr);
      fields = grokPattern.fields.filter((field) => field !== null)
    }
    catch (error) {
      console.log('Error on creating fields for grokPatternStr >>', grokPatternStr);
      console.log('Error >> ', error);
    }

    return fields;
  }
}

module.exports = new GrokUtil();


