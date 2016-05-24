"use strict";
import React from "react";

class LogField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const field = this.props.field || {};

    return (
      <span>
        {field}
      </span>
    );
  }
}

export default LogField;