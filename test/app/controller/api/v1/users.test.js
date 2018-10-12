'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const baseUrl = '/api/v1/users';
const BaseServiceTest = require('./base_test');

describe(baseUrl, () => {
  const baseServiceTest = new BaseServiceTest({
    baseUrl,
    app,
    assert,
    baseModel: 'user',
    checkListKey: [ 'nickname', 'mobiePhone' ],
    whereParam: 'mobiePhone',
    willSave: {
      mobiePhone: '86_13000000004',
    },
    checkSaveKey: [ 'nickname', 'lastLanguage', 'isLock', 'genderType' ],
    willSaveValidate: {
      nickname: '86_13000000004',
    },
    willUpdate: {
      mobiePhone: '86_130000',
      lastLanguage: 'zh',
    },
    willUpdate422Keys: [ 'mobiePhone' ],
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
