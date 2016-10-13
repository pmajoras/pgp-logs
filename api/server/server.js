'use strict';

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
var elasticConnector = require('../infrastructure/elastic-connect');
var middlewares = require('../middlewares/middlewares-config');

var grokHelper = require('../helpers/grok-helper');
var ruleHelper = require('../helpers/rule-helper');
var emailHelper = require('../helpers/email-helper');
var ApplicationService = require('../domain/services/applications/application-service');
var LogAlertService = require('../domain/services/logAlerts/log-alert-service');
var uuid = require('node-uuid');

var applyDefaultMiddlewares = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // use morgan to log requests to the console
  app.use(morgan('dev'));
  app.use(cors());
};

var app = express();

exports.start = () => {
  console.log('Start function');
  moongoseConnector.startDb();
  elasticConnector.startDb();
  applyDefaultMiddlewares(app);

  // middlewares setup
  middlewares.setup(app);

  var apiApp = express();
  // routes config
  routes.setup(apiApp, controllers);

  const applicationService = new ApplicationService();
  const logAlertService = new LogAlertService();

  // Needs to be improved, It is just for testing.
  apiApp.post('/user/:userId/processMessage', function (req, res, next) {

    console.log('req.body', req.body);
    if (req.body.appId && req.body.message && req.params.userId) {
      let appId = req.body.appId;
      let userId = req.params.userId;
      console.log('user/:userId/processMessage >> appId', appId);
      console.log('user/:userId/processMessage >> userId', userId);

      applicationService.findOne({ appId: appId, userId: userId })
        .then((application) => {
          console.log('user/:userId/processMessage >> applicationService.findOne', application);
          if (!application) {
            next();
          }
          else {
            appId = application._id;
            var logId = uuid.v1();
            var logMessage = { message: req.body.message, compiledMessage: {}, applicationId: appId, logId: logId, processedDate: new Date() };

            console.log('user/:userId/processMessage >> logMessage', logMessage);

            grokHelper.compileMessage(application.logPattern, logMessage.message)
              .then((compiledObject) => {
                console.log('user/:userId/processMessage >> compiledObject', compiledObject);
                logMessage.compiledMessage = compiledObject;

                var elasticClient = elasticConnector.elasticsearch.client;
                elasticClient.create({
                  index: 'pgp-logs-index',
                  type: 'LogMessage',
                  id: logId,
                  body: logMessage
                }, function (err, resp) {
                  console.log('elasticClient err', err);
                  console.log('elasticClient resp', resp);

                  if (err) {
                    next(err);
                  }
                  else {
                    if (Array.isArray(application.alerts) && application.alerts.length > 0) {
                      let alertsToInsert = [];
                      application.alerts.forEach((alert) => {

                        for (var i = 0; i < alert.rules.length; i++) {
                          if (ruleHelper.isRuleAppliedToMessage(alert.rules[i], logMessage.message, logMessage.compiledMessage)) {
                            alertsToInsert.push({ alert: alert, logAlert: { alertId: alert._id, appId: appId, message: logMessage.message, logId: logId, alertDate: new Date() } });
                            break;
                          }
                        }
                      });

                      console.log('alertsToInsert', alertsToInsert.length);
                      if (alertsToInsert.length > 0) {
                        console.log('alertsToInsert', alertsToInsert);
                        logAlertService.bulkInsert(alertsToInsert.map((alertToInsert) => alertToInsert.logAlert))
                          .then(() => {
                            emailHelper.sendAlertsEmail(application.name, alertsToInsert);
                            console.log('bulkInsert Success');
                          })
                          .catch((err) => {
                            console.log('bulkInsert err', err);
                          });
                      }
                    }

                    res.setJsonResponse({ success: true });
                    next();
                  }
                });
              });
          }
        })
        .catch((err) => {
          next(err);
        });
    }
    else {
      next();
    }
  });

  apiApp.post('/processGrok', function (req, res, next) {
    console.log('proccesGrok', req.body);
    let fields = grokHelper.getFields(req.body.grokPattern);
    res.setJsonResponse(fields);
    next();
  });

  app.use('/api', apiApp);

  //var webApp = express();
  //webApp.use('/', express.static('www'));

  app.use('/', express.static('www'));

  app.use(function (req, res) {
    var response = res.getCurrentResponse();
    if (response.status && response.content) {
      res.status(response.status).json(response.content);
      res.end();
    }
    else {
      res.status(404).json('Not Found');
      res.end();
    }
  });

  // middlewares errors setup
  middlewares.setupErrorHandlers(app);

  let port = process.env.PORT || config.web.port;
  app.listen(port);
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
};
// *******************************************************
exports.app = app;
