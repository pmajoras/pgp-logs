'use strict';
const BaseDomainService = require('../../base-domain-service');
const grokHelper = require('../../../helpers/grok-helper');

class ApplicationService extends BaseDomainService {
  constructor() {
    super('applications', 'application');
  }

  save(entity) {
    entity.fields = grokHelper.getFields(entity.logPattern[0]);
    console.log('savedApplication fields', entity.fields);
    return super.save(entity);
  }
}

module.exports = ApplicationService;
