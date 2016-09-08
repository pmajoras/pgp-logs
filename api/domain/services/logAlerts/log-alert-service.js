'use strict';
var BaseDomainService = require('../../base-domain-service');

class LogAlertService extends BaseDomainService {
  constructor() {
    super('logAlerts', 'logAlert');
  }
}

module.exports = LogAlertService;
