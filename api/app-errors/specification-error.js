'use strict';
const AppError = require('./app-error');

class SpecificationError extends AppError {
  constructor(settings) {
    settings = settings || {};
    settings.type = 'Specification';
    settings.statusCode = settings.statusCode || 400;
    super(settings);
  }
}

module.exports = SpecificationError;
