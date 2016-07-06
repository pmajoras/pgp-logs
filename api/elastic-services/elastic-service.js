'use strict';

const elasticsearch = require('elasticsearch');
const q = require('q');

class ElasticService {
  constructor(type, index) {

    this.client = new elasticsearch.Client({
      host: 'http://192.168.0.25:9200/',
      log: 'debug'
    });
    this.type = type || null;
    this.index = index || '_all';
  }

  /**
   *
   */
  search() {
    let queryParams = {
      index: this.index,
    };
    if (this.type) {
      queryParams.type = this.type;
    }
    queryParams.body = {
      query: {
        match_all: {}
      },
      sort: { timestamp: { 'order': 'desc' } }
    };

    return this.fullSearch(queryParams);
  }

  /**
   *
   */
  searchFields() {
    this.client.indices.getMapping().then((resp) => {
      return q(resp);
    }).catch((err) => {
      return q(err);
    });
  }

  /**
   * Makes a full search with the givem params in the elasticsearch.
   */
  fullSearch(query) {
    return this.client.search(query || {}).then((resp) => {
      return q(resp.hits.hits);
    }).catch((err) => {
      return q.reject(err);
    });
  }
}

module.exports = ElasticService;
