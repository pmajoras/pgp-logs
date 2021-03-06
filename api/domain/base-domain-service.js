'use strict';
const Q = require('q');
const specService = require('../specification/spec-service');

class BaseDomainService {
  /**
  * @param {string} servicePathName - The name of the path that this service will use.
  * @param {string} repositoryName - The name of the repository that this service will use.
  * @param {string} requirePath - The base path to require the repository, not necessary.
  */
  constructor(servicePathName, repositoryName, requirePath) {
    let repositoryPath = requirePath || '../infrastructure/repositories/';
    let RepositoryClass = require(repositoryPath + repositoryName + '-repository');

    try {
      this.specifications = require('./services/' + servicePathName + '/specs/specifications');
    }
    catch (err) {
      this.specifications = { saveSpecs: [], deleteSpecs: [] };
    }

    this.repository = new RepositoryClass();
  }

  /**
  * @param {Object} id - The id.
  * @param populate - The name of property to populate, or an array with the properties to populate.
  * @param {boolean} lean - If true returns only the plain Json object.
  * @returns {Promise}
  */
  findById(id, populate, lean) {
    return this.repository.findById(id, populate, lean);
  }

  /**
  * @param {Object} params - Find one by the specified params.
  * @param populate - The name of property to populate, or an array with the properties to populate.
  * @param {boolean} lean - If true returns only the plain Json object.
  * @returns {Promise}
  */
  findOne(params, populate, lean) {
    return this.repository.findOne(params, populate, lean);
  }

  /**
  * @param {Object} params - Find all with the specified params.
  * @param populate - The name of property to populate, or an array with the properties to populate.
  * @param {boolean} params - If true returns only the plain Json object.
  * @returns {Promise}
  */
  findAll(params, populate, lean) {
    return this.repository.findAll(params, populate, lean);
  }

  /**
  * @param {Object} entity - The entity to be created or updated.
  * @returns {Promise} - The saved entity.
  */
  save(entity) {
    let deferred = Q.defer();

    specService.getErrorFromNotSatisfiedSpecifications(this.getSaveSpecifications(), entity)
      .then((notSatisfiedSpecsErrors) => {
        if (!notSatisfiedSpecsErrors) {

          if (!entity) {
            deferred.reject('Cannot save a null entity');
            return;
          }

          if (!entity._id) {

            this.repository.save(entity)
              .then((newEntity) => {
                deferred.resolve(newEntity);
              }, (err) => {
                deferred.reject(err);
              });
          }
          else {
            this.repository.update(entity)
              .then((updatedEntity) => {
                deferred.resolve(updatedEntity);
              }, (err) => {
                deferred.reject(err);
              });
          }
        }
        else {
          deferred.reject(notSatisfiedSpecsErrors);
        }
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  /**
  * @param {Object} entity - The entity to be deleted.
  * @returns {Promise}
  */
  del(entity) {
    if (!entity) {
      return Q.reject('Cannot delete a null or undefined object');
    }

    return this.repository.del(entity);
  }

  /**
  * @returns {Array} - An array of the save specifications.
  */
  getSaveSpecifications() {
    return this.getSpecsFromArrayOfFunctions(this.specifications.saveSpecs);
  }

  /**
   * @returns {Array} - An array of specifications
   */
  getSpecsFromArrayOfFunctions(specificationCreators) {
    let specifications = [];
    specificationCreators = Array.isArray(specificationCreators) ? specificationCreators : [];

    specificationCreators.forEach((specCreator) => {
      if (typeof specCreator === 'function') {
        specifications.push(specCreator(this));
      }
    });
    return specifications;
  }
}

module.exports = BaseDomainService;
