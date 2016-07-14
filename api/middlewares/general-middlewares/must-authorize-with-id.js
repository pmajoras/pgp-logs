'use strict';

const appErrorsFactory = require('../../app-errors/app-errors-factory');

/**
 *
 */
function setup(req, res, next) {
  if (!req.currentUser) {
    next(appErrorsFactory.createAppError({ statusCode: 401 }));
  }
  else if (req.currentUser._id !== req.params.id) {
    next(appErrorsFactory.createAppError({ statusCode: 403 }));
  }
  else {
    next();
  }
}

module.exports = setup;
