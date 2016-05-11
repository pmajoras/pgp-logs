"use strict";
import React from "react";
import FMUI from 'formsy-material-ui';
import AppText from './AppText.jsx';
import ServerError from './ServerError.jsx';
import Messages from '../../messages/messages-pt-br';

const genericMessages = Messages.generic;

export default class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleValid = this.handleValid.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      canSubmit: true,
      serverErrors: [],
      isSubmitting: false
    };
  }

  handleFormSubmission(err) {

    if (err) {
      err = err.data || err;
      this.setServerErrors(err);
    }
    else {

      this.resetForm();
      this.setState({
        isSubmitting: false,
        serverErrors: []
      });
    }
  }

  setServerErrors(newServerErrors) {
    let errors = [];
    if (Array.isArray(newServerErrors)) {
      errors = newServerErrors.map(error => error.message);
    }
    else {
      errors.push("Ocorreu um erro durante a requisição, favor tentar novamente.");
    }

    this.setState({
      serverErrors: errors,
      isSubmitting: false
    });
  }

  handleValid() {
    if (!this.state.canSubmit) {
      this.setState({
        canSubmit: true
      });
    }
  }

  handleInvalid() {
    if (this.state.canSubmit) {
      this.setState({
        canSubmit: false
      });
    }
  }

  submitForm(model) {
    this.setState({
      isSubmitting: true,
      serverErrors: []
    });

    if (typeof this.props.onFormSubmit === 'function') {
      this.props.onFormSubmit(model);
    }
  }

  resetForm() {
    this.refs.form.reset();
  }

  render() {
    let {hideServerErrors, submitButtonMessage, isSubmittingMessage} = this.props;
    let errors = [];

    if (!hideServerErrors) {
      errors = this.state.serverErrors.map((error, index) => {
        return <ServerError key={index} message={error}/>;
      });
    }

    submitButtonMessage = submitButtonMessage || genericMessages.save;
    isSubmittingMessage = isSubmittingMessage || genericMessages.loading + "...";

    let submitButtonText = this.state.isSubmitting ? isSubmittingMessage : submitButtonMessage;

    return (
      <Formsy.Form
        ref="form"
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.submitForm}>
        {this.props.children}
        <div class="form-group">
          {errors}
        </div>
        <button type="submit" disabled={!this.state.canSubmit && !this.state.isSubmitting} class="button button-full button-primary">
          {submitButtonText}
        </button>
      </Formsy.Form>
    );
  }
}
