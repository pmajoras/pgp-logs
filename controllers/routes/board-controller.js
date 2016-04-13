"use strict";
var RouteFactory = require('../route-factory');
var BaseController = require('../base-controller');
var mustAuthorizeWithId = require('../../middlewares/general-middlewares/must-authorize-with-id');
var TodoService = require('../../application-services/todo-service');

class BoardController extends BaseController {
  constructor() {
    super();
    this.todoService = new TodoService();
  }

  getBoards(req, res, next) {
    this.todoService.getBoardsByUserId(req.params.id)
      .then((boards) => {
        res.setJsonResponse(boards);
        next();
      }, (err) => {
        next(err);
      });
  }

  createBoard(req, res, next) {
    this.todoService.createBoard(req.params.id, req.body.name, req.body.description)
      .then((newBoard) => {
        res.setJsonResponse(newBoard);
        next();
      }, (err) => {
        next(err);
      });
  }

  updateBoard(req, res, next) {
    next(new Error("Not implemented"));
  }
}

var routeFactory = new RouteFactory("/todo/:id/")
  .get("boards", "getBoards", mustAuthorizeWithId)
  .post("boards", "createBoard", mustAuthorizeWithId)
  .post("boards/:boardId", "updateBoard", mustAuthorizeWithId);

module.exports = { "Controller": BoardController, "routeFactory": routeFactory };