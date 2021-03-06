'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Info from './pages/Info.jsx';
import Welcome from './pages/Welcome.jsx';
import Layout from './pages/Layout.jsx';
import LogPage from './pages/LogPage.jsx';
import LogALerts from './pages/logAlerts/LogALerts.jsx';
import Alerts from './pages/logAlerts/Alerts.jsx';
import LogAlertsIndex from './pages/logAlerts/LogAlertsIndex.jsx';
import Authentication from './pages/authentication/Authentication.jsx';
import Applications from './pages/applications/Applications.jsx';
import ApplicationsIndex from './pages/applications-v2/Index.jsx';
import ApplicationsEdit from './pages/applications/ApplicationsEdit.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import config from './config/config';
import requireAuth from './route-handlers/require-auth';
import Clipboard from 'clipboard';
new Clipboard('[data-clipboard=""]');
require('./jquery-rest.js');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

config.start();
const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Info}></IndexRoute>
      <Route path='welcome' component={Welcome} onEnter={requireAuth}></Route>
      <Route path='applications' component={ApplicationsIndex} onEnter={requireAuth}>
        <Route path=':alertId/logAlerts' component={LogAlertsIndex}>
        </Route>
      </Route>
      <Route path='log-messages' component={LogPage} onEnter={requireAuth}></Route>
      <Route path='authentication' component={Authentication}></Route>
    </Route>
  </Router>,
  app);
