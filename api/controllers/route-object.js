"use strict";

class RouteObject {
  constructor(type, route, functionName, beforeExecutionMiddlewares, afterExecutionMiddlewares) {
    this.type = type;
    this.route = route;
    this.functionName = functionName;
    this.beforeExecutionMiddlewares = beforeExecutionMiddlewares || [];
    this.afterExecutionMiddlewares = afterExecutionMiddlewares || [];
  }
}

module.exports = RouteObject;