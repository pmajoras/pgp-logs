"use strict";
import React from "react";
import { IndexLink } from "react-router";
import AppLink from "../common/buttons/AppLink.jsx";
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AuthenticationService from "../../services/authentication/AuthenticationService";
import LoginNavButton from "./LoginNavButton.jsx";
import { browserHistory } from 'react-router';
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import ReactRouterHelper from '../../helpers/react-router-helper';

const store = AuthenticationStore;

export default class AppNav extends React.Component {
  constructor() {
    super();
    let authenticationService = new AuthenticationService();
    this.handleAuthenticationChange = this.handleAuthenticationChange.bind(this);
    this.handleLogoff = this.handleLogoff.bind(this);

    this.state = {
      collapsed: true,
      isAuthenticated: authenticationService.isAuthenticated()
    };
  }

  componentWillMount() {
    store.addChangeListener(this.handleAuthenticationChange);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleAuthenticationChange);
  }

  handleAuthenticationChange() {
    let oldIsAuthenticated = this.state.isAuthenticated;
    let newIsAuthenticated = store.isAuthenticated();

    this.setState({ isAuthenticated: newIsAuthenticated });

    if (oldIsAuthenticated === true &&
      newIsAuthenticated === false) {
      ReactRouterHelper.redirectToGuestHome();
    }
  }

  handleLogoff() {
    AuthenticationActions.logoff();
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
      </li>
    ];

    let mustNotBeAuthenticatedLinks = [
      <li key={1}>
        <AppLink to="/">Info</AppLink>
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
            <LoginNavButton onLogoff={this.handleLogoff} isAuthenticated={isAuthenticated}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
