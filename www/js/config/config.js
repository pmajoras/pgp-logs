"use strict";
var $ = require("jquery");
var AuthenticationService = require('../services/authentication/AuthenticationService');
var authenticationService = new AuthenticationService();

module.exports.start = () => {

  $.ajaxSetup({
    beforeSend: function(xhr) {
      let token = authenticationService.getAuthToken();
      if (token) {
        xhr.setRequestHeader('Authentication', token);
      }
    }
  });
};