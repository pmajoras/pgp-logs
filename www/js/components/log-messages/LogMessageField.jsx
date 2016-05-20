"use strict";
import React from "react";

class LogMessageField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div class="log-field">
        <span class="log-field-title">
          {this.props.name}
        </span>
        :
        <span class="break-word">
          {this.props.value}
        </span>
      </div>
    );
  }
}

LogMessageField.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default LogMessageField;