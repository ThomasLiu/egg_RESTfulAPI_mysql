'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const baseUrl = '/api/v1/emails';
const BaseServiceTest = require('./base_test');

describe(baseUrl, () => {
  const baseServiceTest = new BaseServiceTest({
    baseUrl,
    app,
    assert,
    baseModel: 'email',
    checkListKey: [ 'context', 'usage' ],
    whereParam: 'context',
    willSave: {
      context: 'test@test.com',
      usage: 'usage 用途',
      userId: 1,
    },
    checkSaveKey: [ 'context', 'usage', 'userId' ],
    willSaveValidate: {
      usage: 'usage 用途',
    },
    willUpdate: {
      context: 'test@test.com',
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
