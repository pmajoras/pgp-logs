"use strict";
import React from "react";
//import LogMessage from "./LogMessage.jsx";

class LogFields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = this.props.fields || [];
    const logFields = fields.map((field, index) => {
      return <div key={index} field={field}/>;
    });

    return (
      <ul class="list-group">
        {logFields}
      </ul>
    );
  }
}

export default LogFields;