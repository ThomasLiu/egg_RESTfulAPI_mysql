'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const UserRole = app.model.define('user_role', {
    roleId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'userId', 'roleId' ],
      },
    ],
    getterMethods: {
      createdAtFormat() { return app.createAnonymousContext().helper.formatDate(this.createdAt); },
      updatedAtFormat() { return app.createAnonymousContext().helper.formatDate(this.updatedAt); },
    },
  });

  return UserRole;
};
