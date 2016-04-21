"use strict";

var SpecificationBase = require('../../../../specification/specification-base');
var messages = require('../../../../errors-messages/messages-domain').users;

class PasswordMustHaveSixOrMoreCharsSpec extends SpecificationBase {
  constructor() {
    super((target) => {
      if ((target && target.password && typeof target.password == 'string' && target.password.length >= 6) ||
        (target && target._id)) {
        return true;
      }

      this.notSatisfiedReason = messages["1003"];
      this.errorCode = messages["1003"];
      return false;
    });
  }
}

module.exports = PasswordMustHaveSixOrMoreCharsSpec;