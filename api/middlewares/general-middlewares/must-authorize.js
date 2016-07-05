"use strict";

var appErrors = require('../../app-errors/app-error').createAppError;

/**
 * 
 */
function setup(req, res, next) {
  if (!req.currentUser) {
    next(appErrors({ statusCode: 401 }));
  }
  else {
    next();
  }
}

module.exports = setup;