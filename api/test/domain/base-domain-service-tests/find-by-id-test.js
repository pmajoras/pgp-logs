'use strict';
const common = require('../../common');
const spy = common.spy;
const expect = common.expect;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-findById-test', function () {

  before(function () {
  });

  it('should call find by id from repository', function () {
    spy.on(target.repository, 'findById');

    target.findById();
    expect(target.repository.findById).to.have.been.called();
  });

  it('should call find by id from repository with filter', function () {
    spy.on(target.repository, 'findById');

    target.findById('123');
    expect(target.repository.findById).to.have.been.called.with.exactly('123', undefined, undefined);
  });

  it('should call find by id from repository with all parameters', function () {
    spy.on(target.repository, 'findById');

    target.findById('123', true, true);
    expect(target.repository.findById).to.have.been.called.with.exactly('123', true, true);
  });

  after(function () {
  });
});

