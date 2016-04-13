"use strict";
import React from "react";
import AppText from '../../components/common/AppText.jsx';
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import { browserHistory } from 'react-router';
import AppForm from '../../components/common/AppForm.jsx';

const store = AuthenticationStore;
const storeEvents = AuthenticationStore.events;

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

    this.validation = {
      username: {
        errors: {
          isEmail: "O nome do usuário deve ser um e-mail",
          isRequired: "O campo é obrigatório",
        },
        rules: {
          isEmail: true,
          isRequired: true
        }
      },
      password: {
        errors: {
          minLength: "A senha deve ter no mínimo 6 caractéres.",
          maxLength: "A senha deve ter no máximo 20 caractéres.",
          isRequired: "O campo é obrigatório",
        },
        rules: {
          maxLength: 20,
          minLength: 6,
          isRequired: true,
        }
      },
      repeatPassword: {
        errors: {
          minLength: "A senha deve ter no mínimo 6 caractéres.",
          maxLength: "A senha deve ter no máximo 20 caractéres.",
          isRequired: "O campo é obrigatório",
          equalsField: "A senha deve ser a mesma digitada anteriormente."
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
      else {
        browserHistory.push("/welcome");
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
            hintText="Email"
            id="username"
            type="email"
            name="username"
            floatingLabelText="Email(*)"
            validationErrors={username.errors}
            validations={username.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText="Senha"
            id="password"
            type="password"
            name="password"
            floatingLabelText="Senha(*)"
            validationErrors={password.errors}
            validations={password.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText="Senha"
            id="repeated_password"
            type="password"
            name="repeated_password"
            floatingLabelText="Repitir a senha(*)"
            validationErrors={repeatPassword.errors}
            validations={repeatPassword.rules}/>
        </div>
      </AppForm>
    );
  }
}
