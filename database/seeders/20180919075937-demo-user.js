'use strict';

// 创建种子
// npx sequelize seed:generate --name demo-user

// 达到执行以下语句的效果
// insert into `users`
// ( `id`, `updatedAt`, `lastAt`, `lastLanguage`, `headimgurl`, `genderType`, `password`, `mobiePhone`, `nickname`, `isLock`, `email`, `createdAt`)
// values ( '1', '2018-06-22 03:46:20', '2018-06-22 03:46:00', 'zh', 'http://image.hiredchina.com/Fm_MRxEJSyL0dZZzl0VRmbWAAyMq', '0', '$2a$10$2Z.dsSvPDaGLTTnuUc3qN.c7YRuITuFoq/RvaQZ07T3tjrBk65CzG', '86_13422517829', 'Thomas Lau', '0', 'thomas_0836@qq.com', '2016-12-05 06:27:41');

module.exports = {
  up: async queryInterface => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      headimgurl: 'http://image.hiredchina.com/Fm_MRxEJSyL0dZZzl0VRmbWAAyMq',
      mobiePhone: '86_13422517829',
      nickname: 'Thomas Lau',
      email: 'thomas_0836@qq.com',
    }], {});
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
// 执行种子
// npx sequelize db:seed:all

// 撤消最近的种子
// npx sequelize db:seed:undo

// 撤消所有的种子
// npx sequelize db:seed:undo:all
