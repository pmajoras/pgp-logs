"use strict";

// Package modules
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

// Application modules
var controllers = require('../controllers/controllers-config');
var routes = require('../routes-config/routes');
var config = require('../config/config');
var moongoseConnector = require('../infrastructure/moongose-connect');
var middlewares = require('../middlewares/middlewares-config');

var app = express();

exports.start = () => {
  console.log("Start function");
  moongoseConnector.startDb();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // use morgan to log requests to the console
  app.use(morgan('dev'));
  app.use(cors());

  // middlewares setup
  middlewares.setup(app);

  var apiApp = express();
  // routes config
  routes.setup(apiApp, controllers);
  app.use('/api', apiApp);

  //var webApp = express();
  //webApp.use('/', express.static('www'));

  app.use('/', express.static('www'));

  app.use(function(req, res) {
    var response = res.getCurrentResponse();
    if (response.status && response.content) {
      res.status(response.status).json(response.content);
      res.end();
    }
    else {
      res.status(404).json("Not Found");
      res.end();
    }
  });

  // middlewares errors setup
  middlewares.setupErrorHandlers(app);

  let port = process.env.PORT || config.web.port;
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
};
// *******************************************************
exports.app = app;
