'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert-extends');
const baseModel = 'log';
const BaseServiceTest = require('./base_test');

describe(`${baseModel}Service test`, () => {
  const testListOrder = '`creatorName` asc, remark desc';
  const baseServiceTest = new BaseServiceTest({
    app,
    assert,
    baseModel,
    testListOrder,
    willSave: {
      remark: 'this is 这是',
      creatorName: 'creatorName',
      userId: 1,
      creatorId: 1,
    },
    checkSaveKey: [ 'creatorName', 'remark', 'userId', 'creatorId' ],
    willSaveValidate: {
      creatorName: 'creatorName',
    },
    validateErrorRegular: /^SequelizeValidationError:(?:.|[\r\n])*$/,
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
    await baseServiceTest.createBaseTest();
  });

  describe('update(id, payload)', async () => {
    it('should update succeed', async () => {
      const entry = await app.factory.create(baseModel);

      const willUpdate1 = {
        remark: 'update 更新',
      };

      const willUpdate2 = {
        creatorName: 'creatorName 更新',
      };

      // 创建 ctx
      const ctx = app.mockContext();
      const service = ctx.service[baseModel];
      let returnObj = await service.update(entry.id, willUpdate1);
      assert(returnObj.remark === willUpdate1.remark);
      assert(returnObj.userId === entry.userId);
      assert(returnObj.creatorName === entry.creatorName);
      assert(returnObj.creatorId === entry.creatorId);

      returnObj = await service.show(entry.id);
      assert(returnObj.remark === willUpdate1.remark);
      assert(returnObj.userId === entry.userId);
      assert(returnObj.creatorName === entry.creatorName);
      assert(returnObj.creatorId === entry.creatorId);

      returnObj = await service.update(entry.id, willUpdate2);
      assert(returnObj.remark === willUpdate1.remark);
      assert(returnObj.userId === entry.userId);
      assert(returnObj.creatorName === entry.creatorName);
      assert(returnObj.creatorId === entry.creatorId);
      assert(returnObj.creatorName !== willUpdate2.creatorName);

      returnObj = await service.show(entry.id);
      assert(returnObj.remark === willUpdate1.remark);
      assert(returnObj.userId === entry.userId);
      assert(returnObj.creatorName === entry.creatorName);
      assert(returnObj.creatorId === entry.creatorId);

    });
    await baseServiceTest.updateNotExistTest();
  });

  describe('destroy(id)', async () => {
    await baseServiceTest.destroyBaseTest();
  });
});
