'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const baseUrl = '/api/v1/logs';
const BaseServiceTest = require('./base_test');

describe(baseUrl, () => {
  const baseServiceTest = new BaseServiceTest({
    baseUrl,
    app,
    assert,
    baseModel: 'log',
    checkListKey: [ 'remark', 'creatorId', 'creatorName', 'userId' ],
    whereParam: 'remark',
    willSave: {
      remark: 'remark 备注',
      creatorId: 1,
      creatorName: 'creatorName 创建人',
      userId: 1,
    },
    checkSaveKey: [ 'remark', 'creatorId', 'creatorName', 'userId' ],
    willSaveValidate: {
      remark: 'remark 备注',
    },
    willUpdate: {
      remark: 'remark 备注',
    },
    // willUpdate422Keys: [ 'remark' ],
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
