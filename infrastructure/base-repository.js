"use strict";
var Q = require('q');

class BaseRepository {
  constructor(modelName, requirePath) {
    var modelPath = requirePath || '../domain/entities/';
    this.Model = require(modelPath + modelName);
  }

  findById(id, populate, lean) {
    return this.findOne({ _id: id }, populate, lean);
  }

  findOne(params, populate, lean) {
    let query = this.Model.findOne(params);
    if (lean === true) {
      query = query.lean();
    }
    query = this._populate(query, populate);

    return Q.denodeify(query.exec.bind(query));
  }

  findAll(params, populate, lean) {
    let query = this.Model.find(params);
    if (lean === true) {
      query = query.lean();
    }
    query = this._populate(query, populate);

    return Q.denodeify(query.exec.bind(query));
  }

  save(entity) {
    return Q.denodeify(this.Model.create.bind(this.Model, entity));
  }

  update(entity) {
    return Q.denodeify(this.Model.findOneAndUpdate.bind(this.Model, { _id: entity._id }, entity));
  }

  delete(entity) {
    return Q.denodeify(this.Model.remove.bind(this.Model, { _id: entity._id }, entity));
  }

  _populate(query, populate) {
    if (typeof populate == 'string') {
      query = query.populate(populate);
    }
    else if (Array.isArray(populate)) {
      populate.forEach((populateProperty) => {
        query = query.populate(populateProperty);
      });
    }

    return query;
  }
}

module.exports = BaseRepository;