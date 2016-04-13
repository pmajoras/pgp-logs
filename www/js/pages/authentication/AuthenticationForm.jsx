"use strict";
import React from "react";
import AppText from '../../components/common/AppText.jsx';
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import { browserHistory } from 'react-router';
import AppForm from '../../components/common/AppForm.jsx';

const store = AuthenticationStore;
const storeEvents = AuthenticationStore.events;

export default class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthenticationSubmit = this.handleAuthenticationSubmit.bind(this);

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
      else {
        browserHistory.push("/welcome");
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
      </AppForm>
    );
  }
}
