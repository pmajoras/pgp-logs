"use strict";
var $ = require("jquery");
var configFormsy = require("./config-formsy");
var AuthenticationService = require('../services/authentication/AuthenticationService');
var authenticationService = new AuthenticationService();

module.exports.start = () => {

  // First, checks if it isn't implemented yet.
  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
      });
    };
  }

  configFormsy();
  $.ajaxSetup({
    beforeSend: function (xhr) {
      let token = authenticationService.getCredentials().token;
      if (token) {
        xhr.setRequestHeader('Authentication', token);
      }
    }
  });
};