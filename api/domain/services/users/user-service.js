'use strict';
var BaseDomainService = require('../../base-domain-service');

class UserService extends BaseDomainService {
  constructor() {
    super('users', 'user');
  }
}

module.exports = UserService;
