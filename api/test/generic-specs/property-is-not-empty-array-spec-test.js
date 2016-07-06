'use strict';

var common = require('../common');
var assert = common.assert;
var PropertyIsNotEmptyArraySpec = require('../../specification/generic-specifications/property-is-not-empty-array-spec');
var target = new PropertyIsNotEmptyArraySpec('arrayProp', 'Test PropertyIsNotEmptyArraySpec', 100);

describe('property-is-not-empty-array-spec-test', function () {

  before(function () {
  });

  it('should satisfy an array with numbers', function (done) {
    target.isSatisfiedBy({ arrayProp: [1, 2] })
      .then((result) => {
        assert.equal(result, true);
        done();
      });
  });

  it('should satisfy an array with strings', function (done) {
    target.isSatisfiedBy({ arrayProp: ['1', '2'] })
      .then((result) => {
        assert.equal(result, true);
        done();
      });
  });

  it('should not satisfy an empty array', function (done) {
    target.isSatisfiedBy({ arrayProp: [] })
      .then((result) => {
        assert.equal(result, false);
        done();
      });
  });

  it('should not satisfy a null parameter', function (done) {
    target.isSatisfiedBy(null)
      .then((result) => {
        assert.equal(result, false);
        done();
      });
  });

  it('should not satisfy an undefined parameter', function (done) {
    target.isSatisfiedBy()
      .then((result) => {
        assert.equal(result, false);
        done();
      });
  });

  it('should not satisfy an valid array with diferent property name', function (done) {
    target.isSatisfiedBy({ otherProp: ['1', '2'] })
      .then((result) => {
        assert.equal(result, false);
        done();
      });
  });

  after(function () {
  });
});
