'use strict';
var BaseRepository = require('../base-repository');
var Q = require('q');
var applicationModel = require('../../domain/entities/application');

class LogAlertRepository extends BaseRepository {
  constructor() {
    super('logAlert');
  }

  bulkInsert(logAlerts) {
    if (Array.isArray(logAlerts) && logAlerts.length > 0) {

      logAlerts.forEach((logAlert)=>{
        let updateQuery = {
          appId: logAlert.appId,
          'alerts._id': logAlert.alertId
        };
        let updateAction = {
          $inc: { 'alerts.$.count': 1 }
        };

        applicationModel.collection.update(updateQuery, updateAction);
      });

      return Q.nbind(this.Model.collection.insert, this.Model.collection)(logAlerts);
    }

    return Q.reject('Invalid argument. Must be an array of LogAlert');;
  }
}

module.exports = LogAlertRepository;
