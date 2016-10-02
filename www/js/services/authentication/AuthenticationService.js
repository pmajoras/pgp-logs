'use strict';
var q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').authentication;
var storageService = require('../storage/StorageService');
var moment = require('moment');
const authToken = 'AUTH_TOKEN';
const authExpires = 'AUTH_EXPIRES';
const authUserId = 'AUTH_USER_ID';

class AuthenticationService extends BaseService {
  constructor() {
    super();
  }

  authenticate(userViewModel) {

    return this.handleApiPromise(client.authenticate.post(userViewModel))
      .then((data) => {

        storageService.setItem(authToken, data.token);
        storageService.setItem(authExpires, data.expiresAt);
        storageService.setItem(authUserId, data.id);
        data.isAuthenticated = true;
        return q(data);
      })
      .catch((err) => {
        return q.reject(err);
      });
  }

  logoff() {
    storageService.removeItem(authToken);
    storageService.removeItem(authExpires);
    storageService.removeItem(authUserId);
  }

  getCredentials() {
    let isAuthenticated = this.isAuthenticated();

    return {
      isAuthenticated: isAuthenticated,
      token: isAuthenticated ? storageService.getItem(authToken) : null,
      expiresAt: isAuthenticated ? storageService.getItem(authExpires) : null,
      id: isAuthenticated ? storageService.getItem(authUserId) : null,
    };
  }

  getUserId() {
    let isAuthenticated = this.isAuthenticated();

    return isAuthenticated ? storageService.getItem(authUserId) : null;
  }

  isAuthenticated() {
    let expiresAtString = storageService.getItem(authExpires);
    if (expiresAtString) {
      let expiresAt = moment(expiresAtString);
      if (expiresAt.diff(moment()) >= 0) {
        return true;
      }
    }

    return false;
  }
}

module.exports = AuthenticationService;
