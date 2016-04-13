"use strict";

var SpecificationBase = require('../../../../specification/specification-base');

class PasswordMustHaveSixOrMoreCharsSpec extends SpecificationBase {
  constructor() {
    super((target) => {
      if ((target && target.password && typeof target.password == 'string' && target.password.length >= 6) ||
        (target && target._id)) {
        return true;
      }

      this.notSatisfiedReason = "A senha é obrigatória e deve ter no minímo 6 caractéres.";
      this.errorCode = 100;
      return false;
    });
  }
}

module.exports = PasswordMustHaveSixOrMoreCharsSpec;