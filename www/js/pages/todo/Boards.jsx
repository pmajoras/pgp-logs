"use strict";
import React from "react";
import SearchContainer from "../../components/common/SearchContainer.jsx";
import BoardActions from "../../actions/todo/BoardActions";
import BoardStore from "../../stores/todo/BoardStore";
import { OverlayTrigger, Popover } from 'react-bootstrap';
import CreateBoard from './boards/CreateBoard.jsx';
import BoardsContainer from './boards/BoardsContainer.jsx';
const store = BoardStore;
const storeEvents = BoardStore.events;

export default class Boards extends React.Component {

  constructor(props) {
    super(props);
    this.handleBoardsLoaded = this.handleBoardsLoaded.bind(this);

    this.state = {
      boards: store.getBoards(),
      filter: ""
    };
  }

  componentWillMount() {
    store.on(storeEvents.boardsLoaded, this.handleBoardsLoaded);
  }

  componentWillUnmount() {
    store.removeListener(storeEvents.boardsLoaded, this.handleBoardsLoaded);
  }

  componentDidMount() {
    BoardActions.getBoards();
  }

  handleBoardsLoaded(err, boards) {
    if (err) {
      alert("Ocorreu um erro ao carregar os quadros");
      console.log("handleBoardsLoaded", err);
    }
    else {
      this.setState({
        boards: boards
      });
    }
  }

  getFilteredBoards() {
    let filter = this.state.filter || "";
    if (filter.length > 0) {

      return this.state.boards.filter((board) => board.name.toUpperCase().indexOf(filter.toUpperCase()) > -1).map((board) => board);
    }
    else {
      return this.state.boards;
    }
  }

  search() {
    BoardActions.getBoards();
  }

  handleFilterChange(value) {
    this.setState({
      filter: value
    });
  }

  onBoardCreated() {
    this.refs.createBoardPopover.hide();
  }

  render() {
    const boards = this.getFilteredBoards();

    return (
      <div>
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-4 col-md-4">
                Conteudo
              </div>
              <div class="col-xs-4 col-md-4 text-center">
                Boards
              </div>
              <div class="col-xs-4 col-md-4">
                <OverlayTrigger ref="createBoardPopover" trigger="click" placement="bottom"
                  overlay={
                    <Popover id="createBoardPopover" title="Criar Quadro">
                      <CreateBoard onSuccess={this.onBoardCreated.bind(this) }/>
                    </Popover>
                  }>
                  <button class="button button-raised button-action button-circle pull-right">
                    <i class="fa fa-plus fa-1x"></i>
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
        <SearchContainer onChange={this.handleFilterChange.bind(this) } initialText={this.state.filter} onSearch={this.search.bind(this) }/>
        <BoardsContainer boards={boards}/>
      </div>
    );
  }
}
