"use strict";
import React from "react";
import { IndexLink, Link } from "react-router";
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AuthenticationService from "../../services/authentication/AuthenticationService";
import LoginNavButton from "./LoginNavButton.jsx";

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
    console.log("isAuth", isAuthenticated);
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
    const featuredClass = location.pathname === "/" ? "active" : "";
    const welcomeClass = location.pathname.match(/^\/welcome/) ? "active" : "";
    const todoClass = location.pathname.match(/^\/todo/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    const isAuthenticated = this.state.isAuthenticated;

    let mustBeAuthenticatedLinks = [
      <li key={1} class={welcomeClass}>
        <Link to="/welcome">Início</Link>
      </li>,
      <li key={2} class={todoClass}>
        <Link to="/todo/boards">Todos</Link>
      </li>,
      <li key={3} class={settingsClass}>
        <Link to="/settings">Settings</Link>
      </li>
    ];

    let mustNotBeAuthenticatedLinks = [
      <li key={4} class={featuredClass}>
        <IndexLink to="/">Todos</IndexLink>
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
