'use strict';
var BaseDomainService = require('../../base-domain-service');

class LogAlertService extends BaseDomainService {
  constructor() {
    super('logAlerts', 'logAlert');
  }

  bulkInsert(appId, logAlerts) {
    return this.repository.bulkInsert(appId, logAlerts);
  }

  resolveLogAlerts(alertId, logAlertsIds) {
    return this.repository.resolveLogAlerts(alertId, logAlertsIds);
  }
}

module.exports = LogAlertService;
