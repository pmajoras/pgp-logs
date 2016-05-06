"use strict";
import React from "react";
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AppLink from "../common/buttons/AppLink.jsx";

const store = AuthenticationStore;
const storeEvents = AuthenticationStore.events;

export default class LoginNavButton extends React.Component {

  constructor() {
    super();
    this.handleLogoff = this.handleLogoff.bind(this);
  }

  handleLogoff(e) {
    if (typeof this.props.onLogoff === 'function') {
      this.props.onLogoff(e);
    }
  }

  render() {
    var menuItems = [];

    if (!this.props.isAuthenticated) {
      menuItems.push(
        <li key={1}>
          <AppLink to="authentication">Login</AppLink>
        </li>);
    }
    else {
      menuItems.push(<MenuItem onClick={this.handleLogoff } key={1}>Logoff</MenuItem>);
    }

    return (
      <NavDropdown id="login-nav-button" title={!this.props.isAuthenticated ? 'Visitante' : 'Autenticado'}>
        {menuItems}
      </NavDropdown>
    );
  }
}