"use strict";
var $ = require("jquery");
var configFormsy = require("./config-formsy");
var AuthenticationService = require('../services/authentication/AuthenticationService');
var authenticationService = new AuthenticationService();

module.exports.start = () => {

  configFormsy();
  $.ajaxSetup({
    beforeSend: function(xhr) {
      let token = authenticationService.getAuthToken();
      if (token) {
        xhr.setRequestHeader('Authentication', token);
      }
    }
  });
};