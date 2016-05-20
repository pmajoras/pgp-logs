"use strict";
import React from "react";

class AppPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const message = this.props.headerMessage || "";
    const containerClasses = "panel panel-primary";
    if (this.props.classes) {
      containerClasses = containerClasses + " " + this.props.classes;
    }

    return (
      <div class={containerClasses}>
        <div class="panel-heading">{message}</div>
        <div class="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AppPanel.propTypes = {
  headerMessage: React.PropTypes.string,
  classes: React.PropTypes.string
};

export default AppPanel;