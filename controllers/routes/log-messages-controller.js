"use strict";
const RouteFactory = require('../route-factory');
const BaseController = require('../base-controller');
const ElasticMessageService = require('../../elastic-services/elastic-message-service');

class LogMessagesController extends BaseController {
  constructor() {
    super();
    this.elasticMessageService = new ElasticMessageService();
  }

  /**
  * GET - /api/logmessages/
  */
  getLogMessages(req, res, next) {

    this.elasticMessageService.search()
      .then((data) => {
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

const routeFactory = new RouteFactory("/logmessages")
  .get("/", "getLogMessages");

module.exports = { "Controller": LogMessagesController, "routeFactory": routeFactory };