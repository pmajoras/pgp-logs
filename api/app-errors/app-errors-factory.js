'use strict';

const AppError = require('./app-error');
const SpecificationError = require('./specification-error');

module.exports = {
  createAppError: function createAppError(settings) {
    return new AppError(settings);
  },
  createSpecificationError: function createSpecificationError(content, settings) {
    settings = settings || {};
    settings.content = content;
    return new SpecificationError(settings);
  }
};
