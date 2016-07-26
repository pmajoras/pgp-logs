'use strict';
var RouteFactory = require('../route-factory');
var BaseController = require('../base-controller');
var ApplicationService = require('../../domain/services/applications/application-service');
var mustAuthorize = require('../../middlewares/general-middlewares/must-authorize');

class ApplicationsController extends BaseController {
  constructor() {
    super();
  }

  /**
  * GET - /api/applications/
  */
  getApplications(req, res, next) {
    let applicationService = new ApplicationService();

    applicationService.findAll()
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * GET - /api/applications/:applicationId
  */
  getApplicationById(req, res, next) {
    let applicationService = new ApplicationService();

    applicationService.findById(req.params.applicationId)
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * POST - /api/applications/
  */
  createApplication(req, res, next) {
    let applicationService = new ApplicationService();

    applicationService.save(req.body)
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * PUT - /api/applications/:applicationId
  */
  updateApplication(req, res, next) {
    let applicationService = new ApplicationService();

    req.body._id = req.params.applicationId;
    applicationService.save(req.body)
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * DELETE - /api/applications/:applicationId
  */
  deleteApplication(req, res, next) {
    let applicationService = new ApplicationService();
    applicationService.del({ _id: req.params.applicationId })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory('/applications')
  .get('/', 'getApplications', mustAuthorize)
  .get('/:applicationId', 'getApplicationById', mustAuthorize)
  .post('/', 'createApplication', mustAuthorize)
  .put('/:applicationId', 'updateApplication', mustAuthorize)
  .del('/:applicationId', 'deleteApplication', mustAuthorize);

module.exports = { 'Controller': ApplicationsController, 'routeFactory': routeFactory };
