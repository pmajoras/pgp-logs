"use strict";
var Q = require('q');
var defaultPromiseCallback = function(err, data, deferred) {
  if (err) {
    deferred.reject(err);
  }
  else {
    deferred.resolve(data);
  }
};

class BaseRepository {
  constructor(modelName, requirePath) {
    var modelPath = requirePath || '../domain/entities/';
    this.Model = require(modelPath + modelName);
  }

  findById(id, populate, lean) {
    return this.findOne({ _id: id }, populate, lean);
  }

  findOne(params, populate, lean) {
    let deferred = Q.defer();
    let query = this.Model.findOne(params);

    if (lean === true) {
      query = query.lean();
    }
    query = this._populate(query, populate);
    query.exec(function(err, entity) {
      defaultPromiseCallback(err, entity, deferred);
    });

    return deferred.promise;
  }

  findAll(params, populate, lean) {
    let deferred = Q.defer();
    let query = this.Model.find(params);

    if (lean === true) {
      query = query.lean();
    }

    query = this._populate(query, populate);
    query.exec(function(err, entity) {
      defaultPromiseCallback(err, entity, deferred);
    });

    return deferred.promise;
  }

  save(entity) {
    let deferred = Q.defer();
    this.Model.create(entity, function(err, newEntity) {
      defaultPromiseCallback(err, newEntity, deferred);
    });
    return deferred.promise;
  }

  update(entity) {
    let deferred = Q.defer();

    this.Model.findOneAndUpdate({ _id: entity._id }, entity, function(err, updatedEntity) {
      defaultPromiseCallback(err, updatedEntity, deferred);
    });
    return deferred.promise;
  }

  delete(entity) {
    let deferred = Q.defer();
    this.Model.remove({ _id: entity._id }, function(err) {
      defaultPromiseCallback(err, null, deferred);
    });
    return deferred.promise;
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