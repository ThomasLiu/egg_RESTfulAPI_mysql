'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const baseUrl = '/api/v1/phones';
const BaseServiceTest = require('./base_test');

describe(baseUrl, () => {
  const baseServiceTest = new BaseServiceTest({
    baseUrl,
    app,
    assert,
    baseModel: 'phone',
    checkListKey: [ 'context', 'usage' ],
    whereParam: 'context',
    willSave: {
      context: '86_13000000004',
      usage: 'usage 用途',
      userId: 1,
    },
    checkSaveKey: [ 'context', 'usage', 'userId' ],
    willSaveValidate: {
      usage: 'usage 用途',
    },
    willUpdate: {
      context: '86_13000000004',
      usage: 'usage 用途',
    },
    willUpdate422Keys: [ 'context' ],
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
