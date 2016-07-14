'use strict';
var BaseDomainService = require('../../base-domain-service');

class ApplicationService extends BaseDomainService {
  constructor() {
    super('applications', 'application');
  }
}

module.exports = ApplicationService;
