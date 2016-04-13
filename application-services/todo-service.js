"use strict";
var UserService = require('../domain/services/users/user-service');
var BoardService = require('../domain/services/boards/board-service');
var EntityWithIdMustExistSpec = require('./specifications/entity-with-id-must-exist-spec');
var Q = require("q");

class TodoService {
  constructor(userService, boardService) {
    this._userService = userService || new UserService();
    this._boardService = boardService || new BoardService();
  }

  /**
  * @param {Object} id - The user id.
  * @returns {Promise}
  */
  getBoardsByUserId(id) {
    let deferred = Q.defer();

    this._boardService.findAll({ owner: id }, null, true)
      .then((boards) => {
        deferred.resolve(boards || []);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  /**
  * @param {Object} userId - The user id.
  * @param {String} boardName - The board name.
  * @param {String} boardDescription - The board description.
  * @returns {Promise}
  */
  createBoard(userId, boardName, boardDescription) {
    let deferred = Q.defer();
    let entityWithIdMustExistSpec = new EntityWithIdMustExistSpec(this._userService);
    let foundUser = null;

    let saveBoard = (user) => {
      foundUser = user.toObject();
      return this._boardService.save({ name: boardName, description: boardDescription, owner: foundUser._id });
    };

    entityWithIdMustExistSpec.isSatisfiedBy(userId)
      .then(saveBoard)
      .then((newBoard) => {
        deferred.resolve(newBoard);
      })
      .catch((err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  /**
  * @param {Object} boardId - The board id.
  * @param {String} boardName - The board name.
  * @param {String} boardDescription - The board description.
  * @returns {Promise}
  */
  updateBoard(boardId, boardName, boardDescription) {
    let deferred = Q.defer();
    let entityWithIdMustExistSpec = new EntityWithIdMustExistSpec(this._boardService);
    let saveBoard = (boardToUpdate) => {
      boardToUpdate.name = boardName;
      boardToUpdate.description = boardDescription;
      return this._boardService.save(boardToUpdate);
    };

    entityWithIdMustExistSpec.isSatisfiedBy(boardId)
      .then(saveBoard)
      .then((updatedBoard) => {
        deferred.resolve(updatedBoard);
      })
      .catch((err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
}

module.exports = TodoService;