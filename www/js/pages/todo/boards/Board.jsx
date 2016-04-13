"use strict";
import React from "react";

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    let board = this.props.board || {};

    this.state = {
      boardName: board.name || "",
      boardDescription: board.description || ""
    };
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  render() {
    const {boardName, boardDescription} = this.state;

    return (
      <div class="col-md-4 col-sm-6 col-xs-12 board-container">
        <div class="board">
          <div class="title">
            {boardName}
          </div>
          <p class="description">
            {boardDescription}
          </p>
        </div>
      </div>
    );
  }
}
