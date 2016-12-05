'use strict';
const RouteFactory = require('../route-factory');
const BaseController = require('../base-controller');
const LogAlertService = require('../../domain/services/logAlerts/log-alert-service');
const mustAuthorizeWithId = require('../../middlewares/general-middlewares/must-authorize-with-id');
const logAlertService = new LogAlertService();

class LogAlertsController extends BaseController {
  constructor() {
    super();
  }

  /**
  * GET - /api/user/:userId/logAlerts/
  */
  getLogAlerts(req, res, next) {

    logAlertService.findAll({ userId: req.currentUser._id, isResolved: { $ne: true } })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * GET - /api/user/:userId/logAlerts/:alertId
  */
  getLogAlertsByAlertId(req, res, next) {

    logAlertService.findAll({ userId: req.params.userId, alertId: req.params.alertId, isResolved: { $ne: true } })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * POST - /api/user/:userId/logAlerts/:alertId/resolve
  */
  resolveLogAlerts(req, res, next) {

    logAlertService.resolveLogAlerts(req.params.alertId, req.body.logAlertsIds)
      .then((data) => {
        console.log('resolve >> ', data);
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * POST - /api/user/:userId/logAlerts
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
  * PUT - /api/user/:userId/logAlerts/:logAlertId
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
  * DELETE - /api/user/:userId/logAlerts/:logAlertId
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

var routeFactory = new RouteFactory('/user/:userId/logAlerts')
  .get('/', 'getLogAlerts', mustAuthorizeWithId)
  .get('/:alertId', 'getLogAlertsByAlertId', mustAuthorizeWithId)
  .post('/:alertId/resolve', 'resolveLogAlerts', mustAuthorizeWithId)
  .post('/', 'createLogAlert')
  .put('/:logAlertId', 'updateLogAlert', mustAuthorizeWithId)
  .del('/:logAlertId', 'deleteLogAlert', mustAuthorizeWithId);

module.exports = { 'Controller': LogAlertsController, 'routeFactory': routeFactory };
