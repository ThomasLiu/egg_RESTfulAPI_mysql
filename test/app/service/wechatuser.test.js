'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert-extends');
const baseModel = 'wechatuser';
const BaseServiceTest = require('./base_test');

describe(`${baseModel}Service test`, () => {
  const testListOrder = '`nickname` asc, openid desc';
  const alreadyExistsRegular = /^UnprocessableEntityError: This unionid already exists$/;
  const baseServiceTest = new BaseServiceTest({
    app,
    assert,
    baseModel,
    testListOrder,
    willSave: {
      headimgurl: 'headimgurl 这是',
      unionid: 'unionid',
      entryId: 1,
    },
    checkSaveKey: [ 'nickname', 'sex', 'openid', 'province', 'city', 'country', 'headimgurl', 'privilege', 'unionid', 'entryId' ],
    willSaveValidate: {
      nickname: 'nickname',
    },
    validateErrorRegular: /^UnprocessableEntityError: unionid cannot be null$/,
    willUpdate: {
      nickname: 'nickname 更新',
      openid: 'openid 更新',
    },
    checkUpdateKey: [ 'sex', 'province', 'city', 'country', 'headimgurl', 'privilege', 'unionid', 'entryId' ],
  });

  describe('index(payload)', async () => {
    await baseServiceTest.indexBaseTest();
  });

  describe('show(id)', async () => {
    await baseServiceTest.showBaseTest();
  });

  describe('create(payload)', async () => {
    it('Repeat unionid should can‘t create', async () => {
      const entry = await app.factory.create(baseModel);
      const willSave = {
        unionid: entry.unionid,
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
    it('should not update succeed repeat unionid', async () => {
      const entry1 = await app.factory.create(baseModel);
      const entry2 = await app.factory.create(baseModel);
      const willUpdate = {
        unionid: entry2.unionid,
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

  describe('canUseUnionid({ unionid, neId })', () => {
    it('should true', async () => {
      const entry = await app.factory.create(baseModel);
      const returnObj = await app.mockContext().service[baseModel].canUseUnionid({ unionid: entry.unionid });
      assert(!returnObj);
    });
  });
});
