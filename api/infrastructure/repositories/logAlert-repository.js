'use strict';
var BaseRepository = require('../base-repository');
var Q = require('q');

class LogAlertRepository extends BaseRepository {
  constructor() {
    super('logAlert');
  }

  bulkInsert(logAlerts) {
    if (Array.isArray(logAlerts) && logAlerts.length > 0) {
      return Q.nbind(this.Model.collection.insert, this.Model.collection)(logAlerts);
    }

    return Q.reject('Invalid argument. Must be an array of LogAlert');;
  }
}

module.exports = LogAlertRepository;
