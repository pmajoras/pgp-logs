"use strict";
import React from "react";
import { IndexLink, Link } from "react-router";
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import { browserHistory } from 'react-router';

const store = AuthenticationStore;
const storeEvents = AuthenticationStore.events;

export default class LoginNavButton extends React.Component {

  constructor() {
    super();
    this.handleLogoff = this.handleLogoff.bind(this);
    this.handleSubmitLogoff = this.handleSubmitLogoff.bind(this);
  }

  componentWillMount() {
    store.on(storeEvents.authenticationChanged, this.handleLogoff);
  }

  componentWillUnmount() {
    store.removeListener(storeEvents.authenticationChanged, this.handleLogoff);
  }

  handleLogoff() {
    browserHistory.push("/");
  }

  handleSubmitLogoff() {
    AuthenticationActions.logoff();
  }

  render() {
    var menuItems = [];

    if (!this.props.isAuthenticated) {
      menuItems.push(
        <li key={1}>
          <Link to="authentication">Login</Link>
        </li>);
      menuItems.push(
        <li key={2}>
          <Link to="register">Registrar</Link>
        </li>);
    }
    else {
      menuItems.push(<MenuItem onClick={this.handleSubmitLogoff } key={1}>Logoff</MenuItem>);
    }

    return (
      <NavDropdown id="login-nav-button" title={!this.props.isAuthenticated ? 'Visitante' : 'Autenticado'}>
        {menuItems}
      </NavDropdown>
    );
  }
}