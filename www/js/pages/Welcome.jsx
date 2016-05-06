"use strict";
import React from "react";
import AuthenticatedPage from "./AuthenticatedPage.jsx";

export default class Welcome extends AuthenticatedPage {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <div>
        <h1>BEM VINDO!</h1>
      </div>
    );
  }
}
