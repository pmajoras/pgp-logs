"use strict";
var winston = require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'logs/filelog-info.log',
      datePattern: '.yyyy-MM-ddTHH',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'logs/filelog-error.log',
      datePattern: '.yyyy-MM-ddTHH',
      level: 'error'
    })
  ]
});

module.exports = logger;