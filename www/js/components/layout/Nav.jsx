"use strict";
import React from "react";
import { IndexLink } from "react-router";
import AppLink from "../common/buttons/AppLink.jsx";
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AuthenticationService from "../../services/authentication/AuthenticationService";
import LoginNavButton from "./LoginNavButton.jsx";
import { browserHistory } from 'react-router';

export default class AppNav extends React.Component {
  constructor() {
    super();
    let authenticationService = new AuthenticationService();
    this.handleAuthenticationChange = this.handleAuthenticationChange.bind(this);

    this.state = {
      collapsed: true,
      isAuthenticated: authenticationService.isAuthenticated()
    };
  }

  componentWillMount() {
    AuthenticationStore.on(AuthenticationStore.events.authenticationChanged, this.handleAuthenticationChange);
  }

  componentWillUnmount() {
    AuthenticationStore.removeListener(AuthenticationStore.events.authenticationChanged, this.handleAuthenticationChange);
  }

  handleAuthenticationChange(err, isAuthenticated) {

    if (!err) {
      this.setState({ isAuthenticated: isAuthenticated });
    }
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";
    const isAuthenticated = this.state.isAuthenticated;

    let mustBeAuthenticatedLinks = [
      <li key={1}>
        <AppLink to="/welcome">Início</AppLink>
      </li>,
      <li key={2}>
        <AppLink to="/todo/boards">Todos</AppLink>
      </li>,
      <li key={3}>
        <AppLink to="/settings">Settings</AppLink>
      </li>
    ];

    let mustNotBeAuthenticatedLinks = [
      <li key={4}>
        <AppLink to="/">Todos</AppLink>
      </li>
    ];

    let linksThatAllCanUse = [];
    if (isAuthenticated) {
      linksThatAllCanUse = linksThatAllCanUse.concat(mustBeAuthenticatedLinks);
    }
    else {
      linksThatAllCanUse = linksThatAllCanUse.concat(mustNotBeAuthenticatedLinks);
    }

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="javascript:;">TodoApp</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {linksThatAllCanUse}
          </Nav>
          <Nav pullRight>
            <LoginNavButton isAuthenticated={isAuthenticated}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
