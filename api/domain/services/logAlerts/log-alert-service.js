'use strict';
var BaseDomainService = require('../../base-domain-service');

class LogAlertService extends BaseDomainService {
  constructor() {
    super('logAlerts', 'logAlert');
  }

  bulkInsert(logAlerts) {
    return this.repository.bulkInsert(logAlerts);
  }
}

module.exports = LogAlertService;
