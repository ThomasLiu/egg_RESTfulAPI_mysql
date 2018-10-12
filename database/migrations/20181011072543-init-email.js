'use strict';

// 创建迁移 user 表
// npx sequelize migration:generate --name=init-emails
module.exports = {

  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('emails', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('emails', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },

      createdAt: { type: DATE },
      updatedAt: { type: DATE },

      context: { type: STRING, allowNull: false },
      usage: { type: STRING, allowNull: false },
      userId: { type: INTEGER, allowNull: false },
    });
    await queryInterface.addIndex('emails', {
      fields: [ 'context' ],
      unique: true,
      type: 'UNIQUE',
      name: 'e_context',
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('emails');
    */
    await queryInterface.dropTable('emails');
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

