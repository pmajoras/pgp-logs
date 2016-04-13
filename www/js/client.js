"use strict";
import React from "react";
import ReactDOM from "react-dom";
import Formsy from "formsy-react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Info from "./pages/Info.jsx";
import Welcome from "./pages/Welcome.jsx";
import Layout from "./pages/Layout.jsx";
import Settings from "./pages/Settings.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import Register from "./pages/authentication/Register.jsx";
import injectTapEventPlugin from 'react-tap-event-plugin';
import config from './config/config';
require('./jquery-rest.js');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

config.start();
const app = document.getElementById('app');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Info}></IndexRoute>
      <Route path="welcome" component={Welcome}></Route>
      <Route path="settings" component={Settings}></Route>
      <Route path="authentication" component={Authentication}></Route>
      <Route path="register" component={Register}></Route>
    </Route>
  </Router>,
  app);
