"use strict";
import React from "react";

export default class ServerError extends React.Component {

  render() {
    return (
      <div>
        <span>{this.props.message}</span>
      </div>
    );
  }
}
