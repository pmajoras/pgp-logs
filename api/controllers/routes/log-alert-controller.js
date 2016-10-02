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
  * GET - /api/logalert/
  */
  getLogAlerts(req, res, next) {

    logAlertService.findAll({ userId: req.currentUser._id })
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

    logAlertService.findOne({ userId: req.currentUser._id, _id: req.params.logAlertId })
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

var routeFactory = new RouteFactory('/user/:userId/logAlerts')
  .get('/', 'getLogAlerts', mustAuthorizeWithId)
  .get('/:logAlertId', 'getLogAlertById', mustAuthorizeWithId)
  .post('/', 'createLogAlert')
  .put('/:logAlertId', 'updateLogAlert', mustAuthorizeWithId)
  .del('/:logAlertId', 'deleteLogAlert', mustAuthorizeWithId);

module.exports = { 'Controller': LogAlertsController, 'routeFactory': routeFactory };
