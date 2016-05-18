"use strict";

var server = require('./server/server');

// We will log normal api operations into api.log

// We will log all uncaught exceptions into exceptions.log

server.start();
/*var teste = require('./application-services/elastic-service');
var created = new teste();
created.search()
  .then((data) => {
    console.log("data", data);
  })
  .catch((err) => {
    console.log("err", err);
  });*/

console.log("Successfully started web server. Waiting for incoming connections...");