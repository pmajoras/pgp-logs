'use strict';
const common = require('../../common');
const assert = common.assert;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-getSpecsFromArrayOfFunctions-test', function () {

  before(function () {
  });

  it('should return an empty array with undefined parameter', function () {
    var result = target.getSpecsFromArrayOfFunctions();
    assert.equal(result.length, 0);
  });

  it('should return an empty array with null parameter', function () {
    var result = target.getSpecsFromArrayOfFunctions(null);
    assert.equal(result.length, 0);
  });

  it('should return an empty array with invalid array', function () {
    var parameter = ['param1'];
    var result = target.getSpecsFromArrayOfFunctions(parameter);
    assert.equal(result.length, 0);
  });

  it('should return an array with two objects', function () {
    var firstParameter = () => 1;
    var secondParameter = () => 2;
    var parameter = [firstParameter, secondParameter];

    var result = target.getSpecsFromArrayOfFunctions(parameter);
    assert.equal(result.length, 2);
    assert.equal(result[0], 1);
    assert.equal(result[1], 2);
  });

  after(function () {
  });
});

