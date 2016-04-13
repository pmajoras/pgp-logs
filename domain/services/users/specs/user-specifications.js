"use strict";
var PropertyMustBeAnEmailSpec = require('../../../../specification/generic-specifications/property-must-be-an-email-spec');
var PropertyValueMustBeUniqueInMongoQuery = require('../../../../specification/generic-specifications/property-value-must-be-unique-in-mongo-query');
var PasswordMustHaveSixOrMoreCharsSpec = require('./password-must-have-six-or-more-chars-spec');

module.exports = {
  getPasswordMustHaveSixOrMoreCharsSpec: function() {
    return new PasswordMustHaveSixOrMoreCharsSpec();
  },
  getUsernameMustBeAnEmailSpec: function() {
    return new PropertyMustBeAnEmailSpec("username", "O nome de usuário deve ser um e-mail válido.", 100);
  },
  getUsernameMustBeUniqueSpec: function(mongoPromise) {
    return new PropertyValueMustBeUniqueInMongoQuery("username", mongoPromise, "Já existe um usuário com o e-mail informado.", 100);
  }
};