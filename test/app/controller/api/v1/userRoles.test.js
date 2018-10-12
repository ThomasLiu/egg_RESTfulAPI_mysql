'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const baseUrl = '/api/v1/userroles';
const BaseServiceTest = require('./base_test');

describe(baseUrl, () => {
  const baseServiceTest = new BaseServiceTest({
    baseUrl,
    app,
    assert,
    baseModel: 'userRole',
    checkListKey: [ 'userId', 'roleId' ],
    whereParam: 'roleId',
    willSave: {
      roleId: 1,
      userId: 1,
    },
    checkSaveKey: [ 'userId', 'roleId' ],
    willSaveValidate: {
      userId: 1,
    },
    willUpdate: {
      roleId: 4,
      userId: 5,
    },
    willUpdate422Keys: [ 'userId', 'roleId' ],
  });


  describe(`GET ${baseUrl}`, async () => {
    await baseServiceTest.indexTest();
  });

  describe(`GET ${baseUrl}/:id`, async () => {
    await baseServiceTest.showTest();
  });

  describe(`POST ${baseUrl}`, async () => {
    await baseServiceTest.postTest();
  });

  describe(`PATCH ${baseUrl}/:id`, async () => {
    await baseServiceTest.updateTest();
  });

  describe(`DELETE ${baseUrl}/:id`, async () => {
    await baseServiceTest.deleteTest();
  });
});
