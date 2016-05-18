"use strict";
import React from "react";

class LogMessageField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const message = this.props.name + ':' + this.props.value;

    return (
      <span>
        {message}
      </span>
    );
  }
}

LogMessage.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string
};

export default LogMessage;