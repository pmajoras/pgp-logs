'use strict';
const common = require('../../common');
const spy = common.spy;
const expect = common.expect;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-findOne-test', function () {

  before(function () {
  });

  it('should call findOne from repository', function () {
    spy.on(target.repository, 'findOne');

    target.findOne();
    expect(target.repository.findOne).to.have.been.called();
  });

  it('should call findOne from repository with filter', function () {
    spy.on(target.repository, 'findOne');
    let filter = { _id: '123' };

    target.findOne(filter);
    expect(target.repository.findOne).to.have.been.called.with.exactly(filter, undefined, undefined);
  });

  it('should call findOne from repository with all parameters', function () {
    spy.on(target.repository, 'findOne');
    let filter = { _id: '123' };

    target.findOne(filter, true, true);
    expect(target.repository.findOne).to.have.been.called.with.exactly(filter, true, true);
  });

  after(function () {
  });
});

