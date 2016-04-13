"use strict";
import React from "react";
import { browserHistory } from 'react-router';

export default class Todo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
      <div>
        <div class="panel panel-default">
          <div class="panel-body">
            <h2>
              TodoApp
            </h2>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
