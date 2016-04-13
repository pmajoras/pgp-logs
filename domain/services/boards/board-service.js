"use strict";
var BaseDomainService = require('../../base-domain-service');
var boardSpecifications = require('./specs/board-specifications');

class BoardService extends BaseDomainService {
  constructor() {
    super("board");
  }

  /**
  * @returns {Array} - An array of the save specifications.
  */
  getSaveSpecifications() {
    let saveSpecifications = super.getSaveSpecifications();
    saveSpecifications.push(boardSpecifications.getBoardNameIsRequiredSpec());
    saveSpecifications.push(boardSpecifications.getBoardOwnerIsRequiredAndIsMongoIdSpec());
    return saveSpecifications;
  }

  /**
    * @returns {Array} - An array of the update specifications.
    */
  getUpdateSpecifications() {
    return this.getSaveSpecifications();
  }
}

module.exports = BoardService;