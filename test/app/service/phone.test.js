'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert-extends');
const baseModel = 'phone';
const BaseServiceTest = require('./base_test');


describe(`${baseModel}Service test`, () => {
  const testListOrder = '`usage` asc, userId asc';
  const alreadyExistsRegular = /^UnprocessableEntityError: This Phone (?:.)* already exists$/;
  const baseServiceTest = new BaseServiceTest({
    app,
    assert,
    baseModel,
    testListOrder,
    willSave: {
      context: '86_13000000004',
      usage: 'usage 用途',
      userId: 1,
    },
    checkSaveKey: [ 'context', 'usage', 'userId' ],
    validateErrorRegular: /^UnprocessableEntityError: context cannot be null$/,
    willSaveValidate: {
      usage: 'usage 用途',
    },
    willUpdate: {
      context: '86_13000000004',
      userId: 1,
    },
    checkUpdateKey: [ 'usage' ],
  });

  describe('index(payload)', async () => {
    await baseServiceTest.indexBaseTest();
  });

  describe('show(id)', async () => {
    await baseServiceTest.showBaseTest();
  });

  describe('create(payload)', async () => {

    it('Repeat context should can‘t create', async () => {
      const entry = await app.factory.create(baseModel);
      const willSave = {
        context: entry.context,
      };
      return assert.asyncThrows(
        async () => {
          await app.mockContext().service[baseModel].create(willSave);
        },
        alreadyExistsRegular
      );
    });
    await baseServiceTest.createBaseTest();
  });

  describe('update(id, payload)', async () => {

    it('should not update succeed repeat context', async () => {
      const entry1 = await app.factory.create(baseModel);
      const entry2 = await app.factory.create(baseModel);
      const willUpdate = {
        context: entry2.context,
      };
      return assert.asyncThrows(
        async () => {
          await app.mockContext().service[baseModel].update(entry1.id, willUpdate);
        },
        alreadyExistsRegular
      );
    });
    await baseServiceTest.updateBaseTest();
  });

  describe('destroy(id)', async () => {
    await baseServiceTest.destroyBaseTest();
  });

  describe('canUseContext({ context, neId })', () => {
    it('should true', async () => {
      const entry = await app.factory.create(baseModel);
      const returnObj = await app.mockContext().service[baseModel].canUseContext({ context: entry.context });
      assert(!returnObj);
    });
  });
});
