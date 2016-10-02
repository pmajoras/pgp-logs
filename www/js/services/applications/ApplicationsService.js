'use strict';
const q = require('q');
const BaseService = require('../BaseService');
const client = require('../JqueryRestClientService').applications;
const AuthenticationService = require('../authentication/AuthenticationService');
const authenticationService = new AuthenticationService();

class ApplicationsService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get all the applicaitons.
   * @returns a list of applications.
   */
  getApplications() {
    let userId = authenticationService.getUserId();

    return this.handleApiPromise(client.read(userId))
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
    let userId = authenticationService.getUserId();

    return this.handleApiPromise(client.read(userId, id))
      .then((data) => q(data))
      .catch((err) => q.reject(err));
  }

  deleteApplication(id) {
    let userId = authenticationService.getUserId();
    return this.handleApiPromise(client.del(userId, id))
      .then((data) => q(data))
      .catch((err) => q.reject(err));
  }

  saveApplication(application, id) {
    var promise;
    let userId = authenticationService.getUserId();

    if (id) {
      console.log('appp', application);
      promise = this.handleApiPromise(client.put(userId, id, application));
    }
    else {
      promise = this.handleApiPromise(client.post(userId, application));
    }

    return promise
      .then((data) => q(data))
      .catch((err) => q.reject(err));
  }
}

module.exports = ApplicationsService;
