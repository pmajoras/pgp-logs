'use strict';

var controllers = [];
controllers.push(require(__dirname + '/routes/authentication-controller'));
controllers.push(require(__dirname + '/routes/applications-controller'));
controllers.push(require(__dirname + '/routes/log-alert-controller'));
controllers.push(require(__dirname + '/routes/log-messages-controller'));

module.exports = controllers;
