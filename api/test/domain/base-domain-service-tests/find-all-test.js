'use strict';
const common = require('../../common');
const spy = common.spy;
const expect = common.expect;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-findAll-test', function () {

  before(function () {
  });

  it('should call findAll from repository', function () {
    spy.on(target.repository, 'findAll');

    target.findAll();
    expect(target.repository.findAll).to.have.been.called();
  });

  it('should call findAll from repository with filter', function () {
    spy.on(target.repository, 'findAll');
    let filter = { _id: '123' };

    target.findAll(filter);
    expect(target.repository.findAll).to.have.been.called.with.exactly(filter, undefined, undefined);
  });

  it('should call findAll from repository with all parameters', function () {
    spy.on(target.repository, 'findAll');
    let filter = { _id: '123' };

    target.findAll(filter, true, true);
    expect(target.repository.findAll).to.have.been.called.with.exactly(filter, true, true);
  });

  after(function () {
  });
});

