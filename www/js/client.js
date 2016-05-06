"use strict";
import React from "react";
import ReactDOM from "react-dom";
import Formsy from "formsy-react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Info from "./pages/Info.jsx";
import Welcome from "./pages/Welcome.jsx";
import Layout from "./pages/Layout.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import injectTapEventPlugin from 'react-tap-event-plugin';
import config from './config/config';
import requireAuth from './route-handlers/require-auth';

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
      <Route path="welcome" component={Welcome} onEnter={requireAuth}></Route>
      <Route path="authentication" component={Authentication}></Route>
    </Route>
  </Router>,
  app);
