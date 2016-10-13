'use strict';

var config = {};

if (process.env.PGPENV === 'PROD') {
  config = {
    secret: 'testSecret',
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://pgp-heroku:heroku@ds015730.mlab.com:15730/heroku_2xlkxmc0'
    },
    elasticDb: {
      connectionString: process.env.PGPELDB || 'https://mcp1eg04:wsdselp4ox4w09a@privet-3279442.us-east-1.bonsai.io'
    },
    emailConnection: 'smtps://poffaltest%40gmail.com:pgp261293@smtp.gmail.com'
  };
}
else if (process.env.PGPENV === 'PRE-TEST') {
  config = {
    secret: 'testSecret',
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://pgp-heroku:heroku@ds015730.mlab.com:15730/heroku_2xlkxmc0'
    },
    elasticDb: {
      connectionString: process.env.PGPELDB || 'https://mcp1eg04:wsdselp4ox4w09a@privet-3279442.us-east-1.bonsai.io'
    },
    emailConnection: 'smtps://poffaltest%40gmail.com:pgp261293@smtp.gmail.com'
  };
}
else {
  config = {
    secret: 'testSecret',
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://localhost:27017/ManagementSystem'
    },
    elasticDb: {
      connectionString: process.env.PGPELDB || 'http://127.0.0.1:9200/'
    },
    emailConnection: 'smtps://poffaltest%40gmail.com:pgp261293@smtp.gmail.com'
  };
}

module.exports = config;
