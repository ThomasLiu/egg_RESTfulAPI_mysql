'use strict';

// 创建迁移 user 表
// npx sequelize migration:generate --name=init-wechatusers
module.exports = {

  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('wechatusers', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('wechatusers', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },

      createdAt: { type: DATE },
      updatedAt: { type: DATE },

      nickname: { type: STRING },
      sex: { type: STRING },
      openid: { type: STRING },
      province: { type: STRING },
      city: { type: STRING },
      country: { type: STRING },
      headimgurl: { type: STRING },
      privilege: { type: STRING },
      unionid: { type: STRING, allowNull: false },
      userId: { type: INTEGER },
    });
    await queryInterface.addIndex('wechatusers', {
      fields: [ 'unionid' ],
      unique: true,
      type: 'UNIQUE',
      name: 'u_unionid',
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('wechatusers');
    */
    await queryInterface.dropTable('wechatusers');
  },
};
// 执行迁移
// npx sequelize db:migrate
// NODE_ENV=test npx sequelize db:migrate

// 撤消迁移
// npx sequelize db:migrate:undo
// NODE_ENV=test npx sequelize db:migrate:undo
// 或者  npx sequelize db:migrate:undo:all --to 20180919072700-init-users.js

// (QueryInterface API) [http://docs.sequelizejs.com/class/lib/query-interface.js%7EQueryInterface.html]

