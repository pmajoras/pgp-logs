"use strict";

var RouteObject = require('./route-object');
var appConstants = require('../config/app-constants');

class RouteFactory {
  constructor(baseRoute) {
    this.baseRoute = baseRoute || '';
    this.routes = [];
  }

  /**
   * Creates an route object for a POST verb
   */
  post(path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares) {
    this.routes.push(this._createRoute(appConstants.post, path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares));
    return this;
  }

  /**
  * Creates an route object for a DELETE verb
  */
  delete(path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares) {
    this.routes.push(this._createRoute(appConstants.delete, path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares));
    return this;
  }

  /**
  * Creates an route object for a PUT verb
  */
  put(path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares) {
    this.routes.push(this._createRoute(appConstants.put, path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares));
    return this;
  }

  /**
  * Creates an route object for a GET verb
  */
  get(path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares) {
    this.routes.push(this._createRoute(appConstants.get, path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares));
    return this;
  }

  /**
   * Creates an route object with the specified verb.
   */
  _createRoute(verb, path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares) {

    beforeExecutionMiddlewares = this._createMiddewaresArray(beforeExecutionMiddlewares);
    afterExecutionMiddlewares = this._createMiddewaresArray(afterExecutionMiddlewares);

    return new RouteObject(verb, this.baseRoute + path, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares);
  }

  /**
   * Creates an array of middleware in case the param is a function.
   */
  _createMiddewaresArray(middlewares) {
    if (middlewares && !Array.isArray(middlewares) && typeof (middlewares) == 'function') {
      return [middlewares];
    }
    else if (Array.isArray(middlewares)) {
      return middlewares;
    }

    return null;
  }
}

module.exports = RouteFactory;