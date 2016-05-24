"use strict";
import React from "react";
import LogField from "./LogField.jsx";

class LogFields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = this.props.fields || [];
    console.log("fields", fields);
    const logFields = fields.map((field, index) => {
      return <li class="list-group-item" key={index}><LogField field={field}/></li>;
    });

    return (
      <ul class="list-group">
        {logFields}
      </ul>
    );
  }
}

export default LogFields;