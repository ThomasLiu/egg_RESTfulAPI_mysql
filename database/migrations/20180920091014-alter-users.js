'use strict';

module.exports = {
  up: async queryInterface => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.removeColumn('users', 'password');
    await queryInterface.addIndex('users', {
      fields: [ 'mobiePhone' ],
      unique: true,
      type: 'UNIQUE',
      name: 'u_mobiePhone',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    const { STRING } = Sequelize;
    await queryInterface.removeIndex('users', 'u_mobiePhone');
    await queryInterface.addColumn('users', 'password', { type: STRING, allowNull: false });
  },
};

// 执行迁移
// npx sequelize db:migrate
// NODE_ENV=test npx sequelize db:migrate

// 撤消迁移
// npx sequelize db:migrate:undo
// 或者  npx sequelize db:migrate:undo:all --to 20180919072700-init-users.js

