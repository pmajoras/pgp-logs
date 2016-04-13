"use strict";
var RouteFactory = require('../route-factory');
var AuthenticationService = require('../../application-services/authentication-service');
var BaseController = require('../base-controller');

class AuthenticationController extends BaseController {
  constructor() {
    super();
    this.authenticationService = new AuthenticationService();
  }

  /**
   * Get the tasks.
   */
  registerUser(req, res, next) {

    this.authenticationService.registerAndAuthenticate({ username: req.body.username, password: req.body.password })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      }, (err) => {
        next(err);
      });
  }

  authenticate(req, res, next) {
    this.authenticationService.authenticate({ username: req.body.username, password: req.body.password })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      }, (err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory("/authentication")
  .post("/register", "registerUser")
  .post("/authenticate", "authenticate");

module.exports = { "Controller": AuthenticationController, "routeFactory": routeFactory };