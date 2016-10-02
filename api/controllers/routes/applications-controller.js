'use strict';
var RouteFactory = require('../route-factory');
var BaseController = require('../base-controller');
var ApplicationService = require('../../domain/services/applications/application-service');
var mustAuthorizeWithId = require('../../middlewares/general-middlewares/must-authorize-with-id');

class ApplicationsController extends BaseController {
  constructor() {
    super();
  }

  /**
  * GET - /api/applications/
  */
  getApplications(req, res, next) {
    let applicationService = new ApplicationService();

    applicationService.findAll({ userId: req.currentUser._id })
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

    applicationService.findOne({ _id: req.params.applicationId, userId: req.currentUser._id })
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
    req.body.userId = req.currentUser._id;

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
    req.body.userId = req.currentUser._id;
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
    // Todo Add userId Validation.
    applicationService.del({ _id: req.params.applicationId })
      .then(() => {
        res.setJsonResponse({ success: true });
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory('/user/:userId/applications')
  .get('/', 'getApplications', mustAuthorizeWithId)
  .get('/:applicationId', 'getApplicationById', mustAuthorizeWithId)
  .post('/', 'createApplication', mustAuthorizeWithId)
  .put('/:applicationId', 'updateApplication', mustAuthorizeWithId)
  .del('/:applicationId', 'deleteApplication', mustAuthorizeWithId);

module.exports = { 'Controller': ApplicationsController, 'routeFactory': routeFactory };
