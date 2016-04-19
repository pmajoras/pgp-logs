"use strict";
import React from "react";
import AppText from '../../components/common/AppText.jsx';
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AppForm from '../../components/common/AppForm.jsx';
import Messages from '../../messages/messages-pt-br';

const errorMessages = Messages.errors.generic;
const authenticationErrorsMessages = Messages.errors.authentication;
const registerUserMessages = Messages.registerUser;

const store = AuthenticationStore;
const storeEvents = AuthenticationStore.events;

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

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
          isRequired: true,
        }
      },
      repeatPassword: {
        errors: {
          minLength: errorMessages.MinLengthError(6),
          maxLength: errorMessages.MaxLengthError(6),
          isRequired: errorMessages.IsRequiredError(),
          equalsField: authenticationErrorsMessages.passwordMustRepeat
        },
        rules: {
          maxLength: 20,
          minLength: 6,
          isRequired: true,
          equalsField: "password"
        }
      }
    };
  }

  componentWillMount() {
    store.on(storeEvents.registerSubmitted, this.handleRegisterSubmit);
  }

  componentWillUnmount() {
    store.removeListener(storeEvents.registerSubmitted, this.handleRegisterSubmit);
  }

  handleRegisterSubmit(err, data) {
    this.refs.authForm.handleFormSubmission(err);

    if (!err) {
      if (this.props.onAuthenticationSuccess && typeof this.props.onAuthenticationSuccess == 'function') {
        this.props.onAuthenticationSuccess(data);
      }
    }
  }

  register(model) {
    AuthenticationActions.register(model);
  }

  render() {
    let {username, password, repeatPassword} = this.validation;

    return (
      <AppForm ref="authForm" onFormSubmit={this.register.bind(this) }>
        <div class="form-group">
          <AppText
            hintText={registerUserMessages.usernameLabel}
            id="username"
            type="email"
            name="username"
            floatingLabelText={registerUserMessages.usernameLabel + '(*)'}
            validationErrors={username.errors}
            validations={username.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText={registerUserMessages.passwordLabel}
            id="password"
            type="password"
            name="password"
            floatingLabelText={registerUserMessages.passwordLabel + '(*)'}
            validationErrors={password.errors}
            validations={password.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText={registerUserMessages.passwordLabel}
            id="repeated_password"
            type="password"
            name="repeated_password"
            floatingLabelText={registerUserMessages.repeatPasswordLabel + '(*)'}
            validationErrors={repeatPassword.errors}
            validations={repeatPassword.rules}/>
        </div>
      </AppForm>
    );
  }
}
