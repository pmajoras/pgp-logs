"use strict";

var jwtMiddleware = require(__dirname + '/general-middlewares/jwt-middleware');
var errorHandlers = require(__dirname + '/error-middlewares/error-handlers');


/**
 * 
 */
function setup(app) {

  app.use(function(req, res, next) {
    res.setJsonResponse = function(json, statusCode) {
      res.jsonContent = json;
      res.jsonResponseStatusCode = statusCode || 200;
    };

    res.getCurrentResponse = function() {
      return {
        content: res.jsonContent,
        status: res.jsonResponseStatusCode
      };
    };

    next();
  });

  app.use(jwtMiddleware);
}

function setupErrorHandlers(app) {
  app.use(errorHandlers.errorLogHandler);
  app.use(errorHandlers.errorHandler);
}

module.exports.setupErrorHandlers = setupErrorHandlers;
module.exports.setup = setup;