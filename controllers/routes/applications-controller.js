"use strict";
var RouteFactory = require('../route-factory');
var BaseController = require('../base-controller');

class ApplicationsController extends BaseController {
  constructor() {
    super();
  }

  /**
  * GET - /api/applications/
  */
  getApplications(req, res, next) {

  }

  /**
  * GET - /api/applications/:applicationId
  */
  getApplicationById(req, res, next) {

  }

  /**
  * POST - /api/applications/
  */
  createApplication(req, res, next) {

  }

  /**
  * PUT - /api/applications/:applicationId
  */
  updateApplication(req, res, next) {

  }

  /**
  * DELETE - /api/applications/:applicationId
  */
  deleteApplication(req, res, next) {

  }
}

var routeFactory = new RouteFactory("/applications")
  .get("/", "getApplications")
  .get("/:applicationId", "getApplicationById")
  .post("/", "createApplication")
  .put("/:applicationId", "updateApplication")
  .delete("/:applicationId", "deleteApplication");

module.exports = { "Controller": ApplicationsController, "routeFactory": routeFactory };