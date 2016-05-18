"use strict";

const ElasticService = require('./elastic-service');

/**
 * 
 */
class ElasticMessageService extends ElasticService {
  constructor() {
    super("message", null);
  }
}

module.exports = ElasticMessageService;