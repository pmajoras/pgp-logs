'use strict';
const common = require('../../common');
const spy = common.spy;
const expect = common.expect;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-GetSaveSpecifications-test', function () {

  before(function () {
  });

  it('should call getSpecsFromArrayOfFunctions from BaseDomainService', function () {
    spy.on(target, 'getSpecsFromArrayOfFunctions');

    target.getSaveSpecifications();
    expect(target.getSpecsFromArrayOfFunctions).to.have.been.called.with.exactly(target.specifications.saveSpecs);
  });

  after(function () {
  });
});

