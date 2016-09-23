'use strict';
var $ = require('jquery');

//https://pgp-logs-app.herokuapp.com/api/
//http://localhost:8085/api/
var client = new $.RestClient('http://localhost:8085/api/', {
  verbs: {
    'post': 'POST',
    'read': 'GET',
    'put': 'PUT',
    'del': 'DELETE'
  },
  stringifyData: true
});

client.add('authentication', { isSingle: true });
client.authentication.add('authenticate', { isSingle: true });
client.add('logmessages', { isSingle: true });
client.logmessages.add('fields', { isSingle: true });
client.add('applications');
client.add('logAlerts');

module.exports = {
  client: client,
  authentication: client.authentication,
  applications: client.applications,
  logMessages: client.logmessages,
  logAlerts: client.logAlerts
};
