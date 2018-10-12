'use strict';

const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => factories(app));

// 第一次初始化测试数据库
// NODE_ENV=test npx sequelize db:migrate

afterEach(async () => {
  // clear database after each test case
  await Promise.all([
    // define your own model.destroy here
    app.model.User.destroy({ truncate: true, force: true }),
    app.model.Log.destroy({ truncate: true, force: true }),
    app.model.Wechatuser.destroy({ truncate: true, force: true }),
    app.model.UserRole.destroy({ truncate: true, force: true }),
    app.model.Email.destroy({ truncate: true, force: true }),
    app.model.Phone.destroy({ truncate: true, force: true }),
  ]);
});
