'use strict';

var uniqueId = 1;

class ReactIdGenerator {
  constructor() {
  }

  getId() {
    return 'r-id-gen' + uniqueId++;
  }
}

module.exports = new ReactIdGenerator();
