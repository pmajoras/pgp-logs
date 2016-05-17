"use strict";
import React from "react";
import SearchContainer from "../components/common/SearchContainer.jsx";

export default class Welcome extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <SearchContainer/>
      </div>
    );
  }
}
