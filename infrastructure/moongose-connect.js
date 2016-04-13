"use strict";

var config = require("../config/config");
var mongoose = require('mongoose');

module.exports = {
  "startDb": function (opts) {
    
    console.log("config", config);
    var options = opts || {};
    mongoose.connect(options.connectionString || config.db.connectionString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log("Openned DB");
      if (options.connectionOpenned instanceof Function) {
        options.connectionOpenned();
      }
    });
  },
};
