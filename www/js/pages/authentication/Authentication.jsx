"use strict";
import React from "react";
import AuthenticationForm from "./AuthenticationForm.jsx";
import ReactRouterHelper from '../../helpers/react-router-helper';
import {authentication} from "../../messages/messages-pt-br";

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAuthenticationSuccess() {
    ReactRouterHelper.redirectToUserHome();
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-primary">
          <div class="panel-heading">{authentication.headerLabel}</div>
          <div class="panel-body">
            <AuthenticationForm onAuthenticationSuccess={this.handleAuthenticationSuccess.bind(this) }/>
          </div>
        </div>
      </div>
    );
  }
}
