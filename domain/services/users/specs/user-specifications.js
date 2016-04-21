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
      return new PropertyMustBeAnEmailSpec("username", messages["1001"], 1001);
    },
    function (userService) {
      let mongoPromise = (filter) => {
        return userService.findAll(filter);
      };

      return new PropertyValueMustBeUniqueInMongoQuery("username", mongoPromise, messages["1002"], 1002);
    }
  ],
  updateSpecs: [
    function (userService) {
      return new PasswordMustHaveSixOrMoreCharsSpec();
    },
    function (userService) {
      return new PropertyMustBeAnEmailSpec("username", messages["1001"], 1001);
    }
  ],
  deleteSpecs: []
};