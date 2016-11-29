'use strict';
var mongoose = require('mongoose');
mongoose.set('debug', true);

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
  app.use(bodyParser.json({ limit: '50mb' }));
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

    //console.log('req.body', req.body);
    if (req.body.appId && req.body.messages && req.params.userId) {
      let appId = req.body.appId;
      let userId = req.params.userId;
      console.log('user/:userId/processMessage >> appId', appId);
      console.log('user/:userId/processMessage >> userId', userId);

      applicationService.findOne({ appId: appId, userId: userId })
        .then((application) => {
          if (!application) {
            next();
          }
          else {
            let bodyMessages = req.body.messages;
            let logMessages = [];
            appId = application._id;
            bodyMessages.forEach((message) => {
              logMessages.push({ message: message, compiledMessage: {}, applicationId: appId, logId: uuid.v1(), processedDate: new Date() });
            });

            grokHelper.compileLogMessages(application.logPattern, logMessages)
              .then((logMessages) => {
                let elasticBulkOperation = [];
                logMessages.forEach((logMessage) => {
                  elasticBulkOperation.push({ index: { _index: 'pgp-logs-index', _type: 'LogMessage', _id: logMessage.logId } });
                  elasticBulkOperation.push(logMessage);
                });

                var elasticClient = elasticConnector.elasticsearch.client;
                elasticClient.bulk({ body: elasticBulkOperation }, function (err) {
                  console.log('elasticClient err', err);

                  if (err) {
                    next(err);
                  }
                  else if (Array.isArray(application.alerts) && application.alerts.length > 0) {

                    ruleHelper.getLogAlertsToSave(userId, appId, application.alerts, logMessages)
                      .then((alertsToInsert) => {
                        if (alertsToInsert.length > 0) {
                          logAlertService.bulkInsert(appId, alertsToInsert.map((alertToInsert) => alertToInsert.logAlert))
                            .then(() => {
                              console.log(`There was generated ${alertsToInsert.length} alerts.`);
                              emailHelper.sendAlertsEmail(application.name, alertsToInsert);
                              console.log('bulkInsert Success');
                            })
                            .catch((err) => {
                              console.log('bulkInsert err', err);
                            })
                            .finally(() => {
                              console.log(`There was ${logMessages.length} messages processed.`);
                              res.setJsonResponse({ success: true });
                              next();
                            });
                        }
                        else {
                          res.setJsonResponse({ success: true });
                          next();
                        }
                      });
                  }
                  else {
                    console.log(`There was ${logMessages.length} messages processed.`);
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
