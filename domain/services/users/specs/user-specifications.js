"use strict";
var PropertyMustBeAnEmailSpec = require('../../../../specification/generic-specifications/property-must-be-an-email-spec');
var PropertyValueMustBeUniqueInMongoQuery = require('../../../../specification/generic-specifications/property-value-must-be-unique-in-mongo-query');
var PasswordMustHaveSixOrMoreCharsSpec = require('./password-must-have-six-or-more-chars-spec');
var messages = require('../../../../errors-messages/messages-domain').users;

module.exports = {
  saveSpecs: [
    function (userService) {
      return new PasswordMustHaveSixOrMoreCharsSpec();
    },
    function (userService) {
      return new PropertyMustBeAnEmailSpec("username",
        messages.usernameMustBeAnEmail.message,
        messages.usernameMustBeAnEmail.code);
    },
    function (userService) {
      let mongoPromise = (filter) => {
        return userService.findAll(filter);
      };

      return new PropertyValueMustBeUniqueInMongoQuery("username", mongoPromise,
        messages.usernameWithEmailAlreadyExists.message,
        messages.usernameWithEmailAlreadyExists.code);
    }
  ],
  deleteSpecs: []
};