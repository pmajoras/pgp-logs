"use strict";
var BaseRepository = require('../base-repository');

class UserRepository extends BaseRepository {
  constructor() {
    super("user");
  }
}

module.exports = UserRepository;