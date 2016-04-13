"use strict";
import dispatcher from "../../dispatcher";
import ActionResponse from "../ActionResponse";
import BoardService from "../../services/boards/BoardService";
import AuthenticationService from "../../services/authentication/AuthenticationService";

var actions = {
  getBoards: "GET_BOARDS",
  createBoard: "CREATE_BOARD"
};

module.exports = {
  actions: actions,
  getBoards: function() {
    let service = new BoardService();
    let authenticationService = new AuthenticationService();

    service.getBoards(authenticationService.getUserId())
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.getBoards, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.getBoards));
      });
  },
  createBoard: function(model) {
    let service = new BoardService();
    let authenticationService = new AuthenticationService();

    service.createBoard(authenticationService.getUserId(), model)
      .then((data) => {
        dispatcher.dispatch(new ActionResponse(null, actions.createBoard, data));
      }, (err) => {
        dispatcher.dispatch(new ActionResponse(err, actions.createBoard, data));
      });
  }
};
