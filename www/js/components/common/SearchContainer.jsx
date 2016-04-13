"use strict";
import React from "react";

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: this.props.placeholder || "Digite a sua busca...",
      text: this.props.initialText || ""
    };
  }

  componentDidMount() {
    this.refs.searchInput.focus();
  }

  handleChange(event) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event.target.value);
    }

    this.setState({ text: event.target.value });
  }

  handleKeyDown(event) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  search() {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.text);
    }
  }

  render() {
    return (
      <div class="panel panel-default">
        <div class="panel-body">
          <button class="button button-raised button-action button-circle pull-left" onClick={this.search.bind(this) }>
            <i class="fa fa-search fa-1x"></i>
          </button>
          <div class="search-text-container">
            <input type="text" ref="searchInput"
              value={this.state.text}
              onKeyDown={this.handleKeyDown.bind(this) }
              placeholder={this.state.placeholder} onChange={this.handleChange.bind(this) } class="form-control search-text"/>
          </div>
        </div>
      </div>
    );
  }
}
