"use strict";
import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer.jsx";
import AppNav from "../components/layout/AppNav.jsx";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>

        <AppNav location={location} />

        <div class="container-fluid" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">

              {this.props.children}

            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}
