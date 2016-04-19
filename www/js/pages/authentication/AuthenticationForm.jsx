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
const storeEvents = AuthenticationStore.events;

export default class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthenticationSubmit = this.handleAuthenticationSubmit.bind(this);

    this.validation = {
      username: {
        errors: {
          isEmail: authenticationErrorsMessages.usernameMustBeEmail,
          isRequired: errorMessages.IsRequiredError(),
        },
        rules: {
          isEmail: true,
          isRequired: true
        }
      },
      password: {
        errors: {
          minLength: errorMessages.MinLengthError(6),
          maxLength: errorMessages.MaxLengthError(6),
          isRequired: errorMessages.IsRequiredError(),
        },
        rules: {
          maxLength: 20,
          minLength: 6,
          isRequired: true
        }
      }
    };
  }

  componentWillMount() {
    store.on(storeEvents.authenticationSubmitted, this.handleAuthenticationSubmit);
  }

  componentWillUnmount() {
    store.removeListener(storeEvents.authenticationSubmitted, this.handleAuthenticationSubmit);
  }

  handleAuthenticationSubmit(err, data) {
    this.refs.authForm.handleFormSubmission(err);

    if (!err) {
      if (this.props.onAuthenticationSuccess && typeof this.props.onAuthenticationSuccess == 'function') {
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
            hintText={authenticationMessages.usernameLabel}
            id="username"
            type="email"
            name="username"
            floatingLabelText={authenticationMessages.usernameLabel + '(*)'}
            validationErrors={username.errors}
            validations={username.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText={authenticationMessages.passwordLabel}
            id="password"
            type="password"
            name="password"
            floatingLabelText={authenticationMessages.passwordLabel + '(*)'}
            validationErrors={password.errors}
            validations={password.rules}/>
        </div>
      </AppForm>
    );
  }
}
