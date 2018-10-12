'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert-extends');
const baseModel = 'userRole';
const BaseServiceTest = require('./base_test');


describe(`${baseModel}Service test`, () => {
  const testListOrder = '`roleId` asc, userId asc';
  const alreadyExistsRegular = /^UnprocessableEntityError: This role already exists$/;
  const baseServiceTest = new BaseServiceTest({
    app,
    assert,
    baseModel,
    testListOrder,
    willSave: {
      roleId: 1,
      userId: 1,
    },
    checkSaveKey: [ 'roleId', 'userId' ],
    validateErrorRegular: /^UnprocessableEntityError: roleId and userId cannot be null$/,
    willSaveValidate: {
      roleId: 1,
    },
    willUpdate: {
      roleId: 2,
      userId: 4,
    },
    checkUpdateKey: [ 'userId' ],
    willUpdateValidate: {
      roleId: 2,
    },
    updateValidateErrorRegular: /^UnprocessableEntityError: roleId and userId cannot be null$/,
  });

  describe('index(payload)', async () => {
    await baseServiceTest.indexBaseTest();
  });

  describe('show(id)', async () => {
    await baseServiceTest.showBaseTest();
  });

  describe('create(payload)', async () => {

    it('Repeat roleId and userId should can‘t create', async () => {
      const entry = await app.factory.create(baseModel);
      const willSave = {
        roleId: entry.roleId,
        userId: entry.userId,
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

    it('should not update succeed repeat roleId', async () => {
      const entry1 = await app.factory.create(baseModel);
      const entry2 = await app.factory.create(baseModel);
      return assert.asyncThrows(
        async () => {
          await app.mockContext().service[baseModel].update(entry1.id, entry2);
        },
        alreadyExistsRegular
      );
    });
    await baseServiceTest.updateBaseTest();
  });

  describe('destroy(id)', async () => {
    await baseServiceTest.destroyBaseTest();
  });

  describe('canUseRoleId({ roleId, userId })', () => {
    it('should true', async () => {
      const entry = await app.factory.create(baseModel);
      const returnObj = await app.mockContext().service[baseModel].canUseRoleId(entry);
      assert(!returnObj);
    });
  });
});
