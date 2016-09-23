'use strict';
const q = require('q');

class ElasticService {
  constructor(client, index, type) {
    this.client = client;
    this.type = type || 'LogMessage';
    this.index = index || 'pgp-logs-index';
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
      from: 0,
      size: 1000,
      query: {
        match_all: {}
      }
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
