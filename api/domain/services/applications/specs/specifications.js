'use strict';
var PropertyIsRequiredSpec = require('../../../../specification/generic-specifications/property-is-required-spec');
var PropertyIsNotEmptyArraySpec = require('../../../../specification/generic-specifications/property-is-not-empty-array-spec');
var PropertyIsNotEmptyTypeArraySpec = require('../../../../specification/generic-specifications/property-is-not-empty-type-array-spec');
var PropertyValueMustBeUniqueInMongoQuery = require('../../../../specification/generic-specifications/property-value-must-be-unique-in-mongo-query');
var messages = require('../../../../errors-messages/messages-domain').applications;

module.exports = {
  saveSpecs: [
    function () {
      return new PropertyIsRequiredSpec('name',
        messages.applicationNameIsRequired.message,
        messages.applicationNameIsRequired.code);
    },
    function (service) {
      let mongoPromise = (filter, target) => {
        filter.userId = target.userId;
        return service.findAll(filter);
      };

      return new PropertyValueMustBeUniqueInMongoQuery('name', mongoPromise,
        messages.applicationWithNameAlreadyExists.message,
        messages.applicationWithNameAlreadyExists.code);
    },
    function () {
      return new PropertyIsRequiredSpec('appId',
        messages.applicationAppIdIsRequired.message,
        messages.applicationAppIdIsRequired.code);
    },
    function (service) {
      let mongoPromise = (filter, target) => {
        filter.userId = target.userId;
        return service.findAll(filter);
      };

      return new PropertyValueMustBeUniqueInMongoQuery('appId', mongoPromise,
        messages.applicationWithAppIdAlreadyExists.message,
        messages.applicationWithAppIdAlreadyExists.code);
    },
    function () {
      return new PropertyIsRequiredSpec('logPattern',
        messages.applicationLogPatternsAreRequired.message,
        messages.applicationLogPatternsAreRequired.code);
    }
  ],
  deleteSpecs: []
};
