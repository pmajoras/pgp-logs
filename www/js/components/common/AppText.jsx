"use strict";
import React from "react";
import FMUI from 'formsy-material-ui';

const { FormsyText } = FMUI;
const defaultStyle = {
  width: "100%"
};

export default class AppText extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.mustFocus) {
      this._input.focus();
    }
  }

  focus() {
    this._input.focus();
  }

  isRequired() {
    return this.props.required ? true : false;
  }

  getLabel() {
    let label = this.props.floatingLabelText || "";
    return this.isRequired() ? label + "(*)" : label;
  }

  render() {
    return (
      <FormsyText
        {...this.props}
        floatingLabelText={this.getLabel() }
        style={defaultStyle}
        ref={(c) => this._input = c}
        formNoValidate
        />
    );
  }
}
