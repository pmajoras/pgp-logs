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
  * Register an user - POST - /api/authentication/register.
  */
  registerUser(req, res, next) {

    this.authenticationService.registerAndAuthenticate({ username: req.body.username, password: req.body.password })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
  * Authenticate the User - POST - /api/authentication/authenticate.
  */
  authenticate(req, res, next) {
    this.authenticationService.authenticate({ username: req.body.username, password: req.body.password })
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory("/authentication")
  .post("/authenticate", "authenticate");

module.exports = { "Controller": AuthenticationController, "routeFactory": routeFactory };