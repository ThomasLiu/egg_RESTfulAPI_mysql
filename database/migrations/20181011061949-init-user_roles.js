'use strict';

// 创建迁移 user 表
// npx sequelize migration:generate --name=init-user_roles
module.exports = {

  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('user_roles', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('user_roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },

      createdAt: { type: DATE },
      updatedAt: { type: DATE },

      roleId: { type: INTEGER, allowNull: false },
      userId: { type: INTEGER, allowNull: false },
    });
    await queryInterface.addIndex('user_roles', {
      fields: [ 'roleId', 'userId' ],
      unique: true,
      type: 'UNIQUE',
      name: 'u_roleId_userId',
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('user_roles');
    */
    await queryInterface.dropTable('user_roles');
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

