'use strict';
const common = require('../../common');
const spy = common.spy;
const expect = common.expect;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-delete-test', function () {

  before(function () {
  });

  it('should not call delete from repository when undefined parameter', function () {
    spy.on(target.repository, 'delete');

    target.delete();
    expect(target.repository.delete).to.not.have.been.called();
  });

  it('should not call delete from repository when null parameter', function () {
    spy.on(target.repository, 'delete');

    target.delete(null);
    expect(target.repository.delete).to.not.have.been.called();
  });

  it('should call delete from repository with entity', function () {
    spy.on(target.repository, 'delete');
    let entity = { id: '123' };

    target.delete(entity);
    expect(target.repository.delete).to.have.been.called.with.exactly(entity);
  });

  after(function () {
  });
});

