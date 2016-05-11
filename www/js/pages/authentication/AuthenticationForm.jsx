"use strict";
import React from "react";
import AppText from '../../components/common/AppText.jsx';
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AppForm from '../../components/common/AppForm.jsx';
import Messages from '../../messages/messages-pt-br';

const errorMessages = Messages.errors.generic;
const authenticationErrorsMessages = Messages.errors.authentication;
const authenticationMessages = Messages.authentication;

const store = AuthenticationStore;

export default class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthenticationSubmit = this.handleAuthenticationSubmit.bind(this);

    this.validation = {
      username: {
        errors: {
          isEmail: authenticationErrorsMessages.usernameMustBeEmail
        },
        rules: {
          isEmail: true
        }
      },
      password: {
        errors: {
          minLength: errorMessages.MinLengthError(6),
          maxLength: errorMessages.MaxLengthError(20)
        },
        rules: {
          maxLength: 20,
          minLength: 6
        }
      }
    };
  }

  componentWillMount() {
    store.addAuthenticationSubmitListener(this.handleAuthenticationSubmit);
  }

  componentWillUnmount() {
    store.removeAuthenticationSubmitListener(this.handleAuthenticationSubmit);
  }

  handleAuthenticationSubmit(err, data) {
    this.refs.authForm.handleFormSubmission(err);

    if (!err) {
      if (typeof this.props.onAuthenticationSuccess === 'function') {
        this.props.onAuthenticationSuccess(data);
      }
    }
  }

  authenticate(model) {
    AuthenticationActions.authenticate(model);
  }

  render() {
    let {username, password} = this.validation;

    return (
      <AppForm ref="authForm" onFormSubmit={this.authenticate.bind(this) }>
        <div class="form-group">
          <AppText
            required
            mustFocus
            hintText={authenticationMessages.usernameLabel}
            id="username"
            type="email"
            name="username"
            floatingLabelText={authenticationMessages.usernameLabel}
            validationErrors={username.errors}
            validations={username.rules}/>
        </div>
        <div class="form-group">
          <AppText
            required
            hintText={authenticationMessages.passwordLabel}
            id="password"
            type="password"
            name="password"
            floatingLabelText={authenticationMessages.passwordLabel}
            validationErrors={password.errors}
            validations={password.rules}/>
        </div>
      </AppForm>
    );
  }
}
