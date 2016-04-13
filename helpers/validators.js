"use strict";
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

module.exports = {
  isMongoId: function(mongoId) {
    if (!mongoId) {
      return false;
    }

    return checkForHexRegExp.test(mongoId);
  }
};