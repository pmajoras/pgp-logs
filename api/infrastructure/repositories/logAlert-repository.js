'use strict';
var BaseRepository = require('../base-repository');

class LogAlertRepository extends BaseRepository {
  constructor() {
    super('logAlert');
  }
}

module.exports = LogAlertRepository;
