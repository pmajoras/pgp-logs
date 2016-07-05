"use strict";
/* jshint ignore:start */

var logger = require('../../server/logger');
module.exports = {

  errorHandler: function errorHandler(err, req, res, next) {

    if (err.type === "Application") {
      res.status(err.statusCode);

      switch (err.statusCode) {
        case 401:
          res.json({ error: 'Você não está autenticado.' });
          break;
        case 403:
          res.json({ error: 'Acesso negado.' });
          break;
        default:
          res.json({ error: 'Something failed!' });
          break;
      }
    }
    else if (err.type === "Specification") {
      res.status(err.statusCode);
      res.json(err.content);
    }
    else {
      res.status(500);
      res.json({ error: 'Something failed!' });
    }
    res.end();
  },

  errorLogHandler: function logErrors(err, req, res, next) {
    logger.error("err", err);
    next(err);
  }
}; 
/* jshint ignore:end */