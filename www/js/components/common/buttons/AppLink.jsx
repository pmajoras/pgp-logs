"use strict";
import React from "react";
import { Link } from "react-router";

export default class AppLink extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (typeof this.props.onLinkClick === 'function') {
      this.props.onLinkClick(e);
    }
  }

  render() {
    return (
      <Link {...this.props} activeClassName="active" onClick={this.handleClick}>
        {this.props.children}
      </Link>
    );
  }
}
