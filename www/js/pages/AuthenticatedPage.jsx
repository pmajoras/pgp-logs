"use strict";
import React from "react";
import AuthenticationStore from "../stores/authentication/AuthenticationStore";

export default class AuthenticatedPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static willTransitionTo(transition) {
    console.log("transition", transition);
    if (!AuthenticationStore.IsAuthenticated()) {

      let transitionPath = transition.path;
      //go to login page
      transition.redirect('/authentication');
    }
  }
}
