'use strict';

// 创建迁移 user 表
// npx sequelize migration:generate --name=init-phones
module.exports = {

  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('phones', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('phones', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },

      createdAt: { type: DATE },
      updatedAt: { type: DATE },

      context: { type: STRING, allowNull: false },
      usage: { type: STRING, allowNull: false },
      userId: { type: INTEGER, allowNull: false },
    });
    await queryInterface.addIndex('phones', {
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
      return queryInterface.dropTable('phones');
    */
    await queryInterface.dropTable('phones');
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

