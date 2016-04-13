"use strict";
import React from "react";
import ReactDOM from "react-dom";
import Formsy from "formsy-react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Welcome from "./pages/Welcome.jsx";
import Todo from "./pages/todo/Todo.jsx";
import Boards from "./pages/todo/Boards.jsx";
import Layout from "./pages/Layout.jsx";
import Settings from "./pages/Settings.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import Register from "./pages/authentication/Register.jsx";
import injectTapEventPlugin from 'react-tap-event-plugin';
import config from './config/config';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
require('./jquery-rest.js');

config.start();
const app = document.getElementById('app');

Formsy.addValidationRule('isRequired', function(values, value) {
  return (value && (typeof value == 'string' && value.length > 0)) === true;
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Welcome}></IndexRoute>
      <Route name="welcome" path="welcome" component={Welcome}></Route>
      <Route path="settings" component={Settings}></Route>
      <Route path="authentication" component={Authentication}></Route>
      <Route path="register" component={Register}></Route>
      <Route path="todo" component={Todo}>
        <Route path="boards" component={Boards}></Route>
      </Route>
    </Route>
  </Router>,
  app);
