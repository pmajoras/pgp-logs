"use strict";

var config = {};

if (process.env.PGPENV == 'PROD') {
  config = {
    secret: "testSecret",
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://pgp-heroku:heroku@ds015730.mlab.com:15730/heroku_2xlkxmc0'
    }
  };
}
else if (process.env.PGPENV == 'PRE-TEST') {
  config = {
    secret: "testSecret",
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://pgp-heroku:heroku@ds015730.mlab.com:15730/heroku_2xlkxmc0'
    }
  };
}
else {
  config = {
    secret: "testSecret",
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://localhost:27017/ManagementSystem'
    }
  };
}

module.exports = config;