'use strict';
import React from 'react';
import AppPanel from '../../components/common/AppPanel.jsx';
import AuthenticationForm from './AuthenticationForm.jsx';
import reactRouterHelper from '../../helpers/react-router-helper';
import {authentication} from '../../messages/messages-pt-br';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAuthenticationSuccess() {
    reactRouterHelper.redirectToUserHome();
  }

  render() {
    return (
      <div class='container'>
        <AppPanel classes='shadow' headerMessage={authentication.headerLabel}>
          <AuthenticationForm onAuthenticationSuccess={this.handleAuthenticationSuccess.bind(this) }/>
        </AppPanel>
      </div>
    );
  }
}
