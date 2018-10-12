'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const baseUrl = '/api/v1/wechatusers';
const BaseServiceTest = require('./base_test');

describe(baseUrl, () => {
  const baseServiceTest = new BaseServiceTest({
    baseUrl,
    app,
    assert,
    baseModel: 'wechatuser',
    checkListKey: [ 'nickname', 'unionid' ],
    whereParam: 'unionid',
    willSave: {
      unionid: 'unionid 标示',
      nickname: 'nickname 别称',
    },
    checkSaveKey: [ 'unionid', 'nickname' ],
    willSaveValidate: {
      nickname: '86_13000000004',
    },
    willUpdate: {
      unionid: '86_130000',
      privilege: 'zh',
    },
    willUpdate422Keys: [ 'unionid' ],
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
