'use strict';
var BaseRepository = require('../base-repository');
var Q = require('q');
var applicationModel = require('../../domain/entities/application');
var mongoose = require('mongoose');

class LogAlertRepository extends BaseRepository {
  constructor() {
    super('logAlert');
  }

  bulkInsert(appId, logAlerts) {
    if (Array.isArray(logAlerts) && logAlerts.length > 0) {

      return Q.nbind(this.Model.collection.insert, this.Model.collection)(logAlerts)
        .then((result) => {
          let alerts = [];
          logAlerts.forEach((logAlert) => {

            let alertIndex = alerts.findIndex((alert) => alert.alertId === logAlert.alertId);
            if (alertIndex > -1) {
              alerts[alertIndex].count++;
            }
            else {
              alerts.push({ alertId: logAlert.alertId, count: 1 });
            }
          });

          alerts.forEach((alert) => {
            let updateQuery = {
              _id: appId,
              'alerts._id': alert.alertId
            };
            let updateAction = {
              $inc: { 'alerts.$.count': alert.count }
            };
            applicationModel.collection.update(updateQuery, updateAction);
          });

          return result;
        })
        .catch((err) => {
          console.log('logALert >> bulkInsert', err);
          return Q.reject(err);
        });
    }

    return Q.reject('Invalid argument. Must be an array of LogAlert');;
  }

  resolveLogAlerts(alertId, logAlertsIds) {

    return this.updateWhere('_id', 'in', logAlertsIds, { isResolved: true })
      .then((data) => {

        let updateQuery = {
          'alerts._id': mongoose.Types.ObjectId(alertId)
        };
        let updateAction = {
          $inc: { 'alerts.$.count': -1 * (data.nModified) }
        };
        applicationModel.collection.update(updateQuery, updateAction);
        return data;
      });
  }
}

module.exports = LogAlertRepository;
