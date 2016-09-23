'use strict';
const RouteFactory = require('../route-factory');
const BaseController = require('../base-controller');
const elasticConnector = require('../../infrastructure/elastic-connect');
const ElasticMessageService = require('../../elastic-services/elastic-service');

class LogMessagesController extends BaseController {
  constructor() {
    super();
    this.elasticMessageService = new ElasticMessageService(elasticConnector.elasticsearch.client);
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
