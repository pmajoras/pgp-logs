'use strict';
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

  /**
   * GET - /api/logmessages/fields
   */
  getLogFields(req, res, next) {

    this.elasticMessageService.searchFields()
      .then((data) => {
        console.log('fieldsSearc', data);
        res.setJsonResponse(data);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

const routeFactory = new RouteFactory('/logmessages')
  .get('/', 'getLogMessages')
  .get('/fields', 'getLogFields');

module.exports = { 'Controller': LogMessagesController, 'routeFactory': routeFactory };
