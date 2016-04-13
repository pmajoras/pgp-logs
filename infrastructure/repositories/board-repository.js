"use strict";
var BaseRepository = require('../base-repository');

class BoardRepository extends BaseRepository {
  constructor() {
    super("board");
  }
}

module.exports = BoardRepository;