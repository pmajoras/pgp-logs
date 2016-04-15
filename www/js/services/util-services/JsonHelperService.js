

class JsonHelperService {
  constructor() {
  }

  /**
   * 
   */
  simpleClone(simpleJson) {
    return JSON.parse(JSON.stringify(simpleJson || {}));
  }
}

module.exports = new JsonHelperService();