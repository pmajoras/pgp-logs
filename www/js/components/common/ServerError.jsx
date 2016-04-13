"use strict";
import React from "react";

export default class ServerError extends React.Component {

  render() {
    return (
      <p>{this.props.message}</p>
    );
  }
}
