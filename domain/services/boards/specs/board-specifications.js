"use strict";
var PropertyIsRequiredSpec = require('../../../../specification/generic-specifications/property-is-required-spec');
var PropertyIsMongoIdSpec = require('../../../../specification/generic-specifications/property-is-mongo-id-spec');

module.exports = {
  getBoardNameIsRequiredSpec: function() {
    return new PropertyIsRequiredSpec("name", "O nome do quadro é obrigatório.", 101);
  },
  getBoardOwnerIsRequiredAndIsMongoIdSpec: function() {
    return new PropertyIsMongoIdSpec("owner", "O quadro deve pertencer a um usuário.", 101);
  }
};