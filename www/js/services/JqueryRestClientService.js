"use strict";
var $ = require('jquery');
var config = require('../../../config/config');

//https://pgp-todo-app.herokuapp.com/api/
//http://localhost:8085/api
var client = new $.RestClient('http://localhost:8085/api/', {
  verbs: {
    'post': 'POST',
    'read': 'GET',
    'put': 'PUT',
    'delete': 'DELETE'
  }
});

client.add('authentication', { isSingle: true });
client.authentication.add('authenticate', { isSingle: true });

module.exports = {
  client: client,
  authentication: client.authentication
};