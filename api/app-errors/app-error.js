'use strict';

class AppError extends Error {
  constructor(settings) {
    super(settings ? settings.message : 'An error occurred.');
    // Ensure that settings exists to prevent refernce errors.
    settings = (settings || {});

    // Override the default name property (Error). This is basically zero value-add.
    this.name = settings.name || 'AppError';

    this.type = settings.type || 'Application';
    this.message = settings.message || 'An error occurred.';
    this.detail = settings.detail || '';
    this.extendedInfo = settings.extendedInfo || '';
    this.errorCode = settings.errorCode || '';
    this.statusCode = settings.statusCode || 500;
    this.content = settings.content || null;

    // Capture the current stacktrace and store it in the property 'this.stack'. By
    // providing the implementationContext argument, we will remove the current
    // constructor (or the optional factory function) line-item from the stacktrace; this
    // is good because it will reduce the implementation noise in the stack property.
    // --
    // Rad More: https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi#Stack_trace_collection_for_custom_exceptions
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
