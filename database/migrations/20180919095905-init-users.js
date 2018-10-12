'use strict';

// 构建数据库
// npx sequelize db:create

// 创建迁移 user 表
// npx sequelize migration:generate --name=init-users
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.createTable('users', { id: INTEGER });
      */
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },

      createdAt: { type: DATE },
      updatedAt: { type: DATE },

      mobiePhone: { type: STRING, allowNull: false },
      email: { type: STRING },
      password: { type: STRING, allowNull: false },
      nickname: { type: STRING, allowNull: false, defaultValue: 'New comer' },
      lastAt: { type: DATE },
      isLock: { type: BOOLEAN, allowNull: false, defaultValue: false },

      lastLanguage: { type: STRING, allowNull: false, defaultValue: 'en' },
      headimgurl: { type: STRING }, // 系统上显示的头像
      genderType: { type: INTEGER, allowNull: false, defaultValue: 0 }, // 性别 0 是男，1 是女
    });
  },

  down: async queryInterface => {
    /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.dropTable('users');
      */
    await queryInterface.dropTable('users');
  },
};
// 执行迁移
// npx sequelize db:migrate
// NODE_ENV=test npx sequelize db:migrate

// 撤消迁移
// npx sequelize db:migrate:undo
// 或者  npx sequelize db:migrate:undo:all --to 20180919072700-init-users.js

// (QueryInterface API) [http://docs.sequelizejs.com/class/lib/query-interface.js%7EQueryInterface.html]

