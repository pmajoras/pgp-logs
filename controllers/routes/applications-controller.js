"use strict";
var RouteFactory = require('../route-factory');
var BaseController = require('../base-controller');
var ApplicationService = require('../../domain/services/applications/application-service');

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

    applicationService.findById(req.query.applicationId)
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

    applicationService.save({ name: req.body.name, password: req.body.description })
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

    applicationService.save({ _id: req.applicationId, name: req.body.name, password: req.body.description })
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

    applicationService.delete({ _id: applicationId })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory("/applications")
  .get("/", "getApplications")
  .get("/:applicationId", "getApplicationById")
  .post("/", "createApplication")
  .put("/:applicationId", "updateApplication")
  .delete("/:applicationId", "deleteApplication");

module.exports = { "Controller": ApplicationsController, "routeFactory": routeFactory };