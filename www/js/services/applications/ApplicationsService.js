'use strict';
var q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').applications;

class ApplicationsService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get all the applicaitons.
   * @returns a list of applications.
   */
  getApplications() {

    return this.handleApiPromise(client.read())
      .then((data) => {
        return q(data);
      })
      .catch((err) => {
        return q.reject(err);
      });
  }

  /**
   * Get an applicaiton by id.
   * @param {any} id
   * @returns return an application.
   */
  getApplicationById(id) {
    return this.handleApiPromise(client.read(id))
      .then((data) => q(data))
      .catch((err) => q.reject(err));
  }

  deleteApplication(id) {
    return this.handleApiPromise(client.del(id))
      .then((data) => q(data))
      .catch((err) => q.reject(err));
  }

  saveApplication(application, id) {
    var promise;

    if (id) {
      promise = this.handleApiPromise(client.put(id, application));
    }
    else {
      promise = this.handleApiPromise(client.post(application));
    }

    return promise
      .then((data) => q(data))
      .catch((err) => q.reject(err));
  }
}

module.exports = ApplicationsService;
