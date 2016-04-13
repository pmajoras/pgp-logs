"use strict";
import React from "react";
import Board from "./Board.jsx";

export default class BoardsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  getBoards() {
    return this.props.boards || [];
  }

  render() {
    const boards = this.getBoards().map((board, index) => <Board board={board} key={index}/>);

    return (
      <div class="row">
        {boards}
      </div>
    );
  }
}
