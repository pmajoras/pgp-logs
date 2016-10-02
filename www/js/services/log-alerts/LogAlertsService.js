'use strict';
var q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').logAlerts;
const ApplicationsService = require('../applications/ApplicationsService');
const applicationService = new ApplicationsService();
const AuthenticationService = require('../authentication/AuthenticationService');
const authenticationService = new AuthenticationService();

class LogAlertsService extends BaseService {
  constructor() {
    super();
  }

  getApplicationLogAlerts() {
    let deferred = q.defer();
    let loadedApplications = [];

    applicationService.getApplications()
      .then((applications) => {
        loadedApplications = applications;
        return client.read(authenticationService.getUserId());
      })
      .then((logAlerts) => {
        let data = [];
        loadedApplications.forEach((application) => {
          let appData = {
            id: application._id,
            appId: application.appId,
            alerts: []
          };

          application.alerts.forEach((alert) => {
            let alertData = {
              name: alert.name,
              quantity: 0
            };

            logAlerts.forEach((logAlert) => {
              if (logAlert.appId === application.appId && logAlert.name === alert.name) {
                alertData.quantity++;
              }
            });

            appData.alerts.push(alertData);
          });

          data.push(appData);
        });

        deferred.resolve(data);
      })
      .catch((err) => {
        return deferred.reject(err);
      });

    return deferred.promise;
  }
}

module.exports = LogAlertsService;
