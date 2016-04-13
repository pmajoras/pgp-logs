"use strict";
import dispatcher from "../../dispatcher";
const BaseStore = require('../BaseStore');
const boardActions = require("../../actions/todo/BoardActions");
const events = {
  boardsLoaded: "EV_BOARDS_LOADED",
  boardCreated: "EV_BOARD_CREATED"
};

class BoardStore extends BaseStore {
  constructor() {
    super({ boards: [] }, events);
  }

  handleGetBoards(err, payload) {

    if (!err) {
      this.setState({ boards: payload });
    }
    this.emit(this.events.boardsLoaded, err, payload);
  }

  handleCreateBoard(err, payload) {
    if (!err) {
      let boards = this.getBoards();
      boards.push(payload);
      this.handleGetBoards(null, boards);
    }
    this.emit(this.events.boardCreated, err, payload);
  }

  getBoards() {
    return this.getState().boards || [];
  }

  handleActions(action) {

    switch (action.type) {
      case boardActions.actions.getBoards: {
        this.handleGetBoards(action.err, action.payload);
        break;
      }
      case boardActions.actions.createBoard: {
        this.handleCreateBoard(action.err, action.payload);
        break;
      }
    }
  }
}

const boardStore = new BoardStore;
dispatcher.register(boardStore.handleActions.bind(boardStore));

export default boardStore;
