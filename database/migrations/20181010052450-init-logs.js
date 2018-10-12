'use strict';

// 创建迁移 user 表
// npx sequelize migration:generate --name=init-logs
module.exports = {

  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('logs', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('logs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },

      createdAt: { type: DATE },
      updatedAt: { type: DATE },

      creatorId: { type: INTEGER, allowNull: false },
      creatorName: { type: STRING, allowNull: false },
      remark: { type: STRING, allowNull: false }, // 记录备注该用户的一些注意事项
      userId: { type: INTEGER, allowNull: false },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('logs');
    */
    await queryInterface.dropTable('logs');
  },
};
// 执行迁移
// npx sequelize db:migrate
// NODE_ENV=test npx sequelize db:migrate

// 撤消迁移
// npx sequelize db:migrate:undo
// 或者  npx sequelize db:migrate:undo:all --to 20180919072700-init-users.js

// (QueryInterface API) [http://docs.sequelizejs.com/class/lib/query-interface.js%7EQueryInterface.html]

