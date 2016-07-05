"use strict";

/**
 * 
 */
function setup(app, controllers) {

  var executeMiddlewares = function(app, route, middlewares) {

    if (middlewares && Array.isArray(middlewares)) {

      middlewares.forEach(function(middleware) {
        if (typeof (middleware) == 'function') {
          app.use(route, middleware);
        }
      });
    }
  };

  // Iterate the controllers configuration
  controllers.forEach(function(controllerConfig) {
    var routeFactory = controllerConfig.routeFactory;
    if (!routeFactory) {
      throw new Error("Error on mapping route factory: Route Factory is undefined");
    }

    // Iterate trough the configurated methods
    routeFactory.routes.forEach(function(routeObject) {

      // Apply the use to the specified middlewares.
      executeMiddlewares(app, routeObject.route, routeObject.beforeExecutionMiddlewares);
      // Apply the route to the specific type using the defined controller and call the functionName
      app[routeObject.type](routeObject.route, function(req, res, next) {
        var controller = null;
        try {
          controller = new controllerConfig.Controller();
        } catch (err) {
          // handle the error safely
          err.extraMessage = "There was an error while creating the controller " + controllerConfig.Controller;
          next(err);
        }

        if (controller) {
          controller[routeObject.functionName](req, res, next);
        }
      });
      // Apply the use to the specified middlewares.
      executeMiddlewares(app, routeObject.route, routeObject.afterExecutionMiddlewares);
    });
  });
}

exports.setup = setup;