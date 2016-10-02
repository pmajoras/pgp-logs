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

client.add('user');
client.user.add('applications');
client.user.add('logAlerts');

client.add('logmessages', { isSingle: true });
client.logmessages.add('fields', { isSingle: true });

module.exports = {
  client: client,
  authentication: client.authentication,
  logMessages: client.logmessages,
  applications: client.user.applications,
  logAlerts: client.user.logAlerts
};
