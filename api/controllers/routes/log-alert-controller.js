'use strict';
const RouteFactory = require('../route-factory');
const BaseController = require('../base-controller');
const LogAlertService = require('../../domain/services/logAlerts/log-alert-service');
const logAlertService = new LogAlertService();

class LogAlertsController extends BaseController {
  constructor() {
    super();
  }

  /**
  * GET - /api/logalert/
  */
  getLogAlerts(req, res, next) {

    logAlertService.findAll()
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * GET - /api/logalert/:logAlertId
  */
  getLogAlertById(req, res, next) {

    logAlertService.findById(req.params.logAlertId)
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * POST - /api/logalert/
  */
  createLogAlert(req, res, next) {

    logAlertService.save(req.body)
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * PUT - /api/logalert/:logAlertId
  */
  updateLogAlert(req, res, next) {

    req.body._id = req.params.logAlertId;
    logAlertService.save(req.body)
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * DELETE - /api/logalert/:logAlertId
  */
  deleteLogAlert(req, res, next) {

    logAlertService.del({ _id: req.params.logAlertId })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory('/logAlerts')
  .get('/', 'getLogAlerts')
  .get('/:logAlertId', 'getLogAlertById')
  .post('/', 'createLogAlert')
  .put('/:logAlertId', 'updateLogAlert')
  .del('/:logAlertId', 'deleteLogAlert');

module.exports = { 'Controller': LogAlertsController, 'routeFactory': routeFactory };
