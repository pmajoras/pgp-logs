'use strict';
var BaseRepository = require('../base-repository');

class ApplicationRepository extends BaseRepository {
  constructor() {
    super('application');
  }
}

module.exports = ApplicationRepository;
