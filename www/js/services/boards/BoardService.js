"use strict";
var Q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').boards;
var appErrors = require('../../errors/app-errors');
var storageService = require('../storage/StorageService');
var moment = require('moment');

class BoardService extends BaseService {
  constructor() {
    super();
  }

  createBoard(userId, boardViewModel) {
    if (!boardViewModel || !boardViewModel.name) {
      return Q.reject(appErrors("O nome de usuário é obrigatório."));
    }

    let deferred = Q.defer();

    this.handleApiPromise(client.post(userId, boardViewModel))
      .then((data) => {
        deferred.resolve(data);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  getBoards(userId) {
    let deferred = Q.defer();

    this.handleApiPromise(client.read(userId))
      .then((data) => {
        deferred.resolve(data);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
}

module.exports = BoardService;