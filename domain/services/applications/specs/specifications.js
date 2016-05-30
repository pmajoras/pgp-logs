"use strict";
var PropertyIsRequiredSpec = require('../../../../specification/generic-specifications/property-is-required-spec');
var PropertyValueMustBeUniqueInMongoQuery = require('../../../../specification/generic-specifications/property-value-must-be-unique-in-mongo-query');
var messages = require('../../../../errors-messages/messages-domain').applications;

module.exports = {
  saveSpecs: [
    function (userService) {
      return new PropertyIsRequiredSpec("name",
        messages.applicationNameIsRequired.message,
        messages.applicationNameIsRequired.code);;
    },
    function (service) {
      let mongoPromise = (filter) => {
        return service.findAll(filter);
      };

      return new PropertyValueMustBeUniqueInMongoQuery("name", mongoPromise,
        messages.applicationWithNameAlreadyExists.message,
        messages.applicationWithNameAlreadyExists.code);
    }
  ],
  deleteSpecs: []
};