'use strict';

var config = require('../config/config');
var elasticsearch = require('elasticsearch-odm-2');

module.exports = {
  'startDb': function (opts) {
    let options = opts || {};

    elasticsearch.connect({
      host: options.connectionString || config.elasticDb.connectionString,
      index: 'pgp-logs-index'
    }).then(() => {
      console.log('Openned ElasticDB');
    }).catch((err) => {
      console.log('elasticErr', err);
      throw err;
    });
  },
};
