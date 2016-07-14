'use strict';
const common = require('../../common');
const spy = common.spy;
const expect = common.expect;

const BaseDomainService = require('../../../domain/base-domain-service');
const target = new BaseDomainService('', 'user');

describe('BaseDomainService-save-test', function () {

  before(function () {
  });

  it('should call save from repository with the entity', function (done) {
    spy.on(target.repository, 'save');
    let entity = { name: '123' };

    target.save(entity);

    setTimeout(() => {
      expect(target.repository.save).to.have.been.called.with.exactly(entity);
      done();
    }, 0);
  });

  it('should not call save from repository with a null entity', function () {
    spy.on(target.repository, 'save');

    target.save(null);

    setTimeout(() => {
      expect(target.repository.save).to.not.have.been.called();
      done();
    }, 0);
  });

  it('should call update from repository with the entity', function () {
    spy.on(target.repository, 'update');
    let entity = { _id: '456', name: '123' };

    target.save(entity);

    setTimeout(() => {
      expect(target.repository.update).to.have.been.called.with.exactly(entity);
      done();
    }, 0);
  });

  it('should not call update from repository with a null entity', function () {
    spy.on(target.repository, 'update');

    target.save(null);

    setTimeout(() => {
      expect(target.repository.update).to.not.have.been.called();
      done();
    }, 0);
  });

  after(function () {
  });
});

