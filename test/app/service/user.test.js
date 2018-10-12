'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert-extends');
const baseModel = 'user';
const BaseServiceTest = require('./base_test');


describe(`${baseModel}Service test`, () => {
  const testListOrder = '`genderType` desc, nickname asc';
  const alreadyExistsRegular = /^UnprocessableEntityError: This phone number 86_[0-9]* already exists$/;
  const baseServiceTest = new BaseServiceTest({
    app,
    assert,
    baseModel,
    testListOrder,
    willSave: {
      mobiePhone: '86_13000000004',
    },
    checkSaveKey: [ 'nickname', 'lastLanguage', 'isLock', 'genderType' ],
    validateErrorRegular: /^UnprocessableEntityError: mobiePhone cannot be null$/,
    willSaveValidate: {
      nickname: '86_13000000004',
    },
    willUpdate: {
      mobiePhone: '86_130000',
      lastLanguage: 'zh',
    },
    checkUpdateKey: [ 'nickname', 'isLock', 'genderType' ],
  });

  describe('index(payload)', async () => {
    await baseServiceTest.indexBaseTest();
  });

  describe('show(id)', async () => {
    await baseServiceTest.showBaseTest();
  });

  describe('create(payload)', async () => {

    it('Repeat mobiePhone should can‘t create', async () => {
      const entry = await app.factory.create(baseModel);
      const willSave = {
        mobiePhone: entry.mobiePhone,
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

    it('should not update succeed repeat mobiePhone', async () => {
      const entry1 = await app.factory.create(baseModel);
      const entry2 = await app.factory.create(baseModel);
      const willUpdate = {
        mobiePhone: entry2.mobiePhone,
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

  describe('canUseMobiePhone({ mobiePhone, neId })', () => {
    it('should true', async () => {
      const entry = await app.factory.create(baseModel);
      const returnObj = await app.mockContext().service[baseModel].canUseMobiePhone({ mobiePhone: entry.mobiePhone });
      assert(!returnObj);
    });
  });
});
