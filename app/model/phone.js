'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const Email = app.model.define('phone', {
    context: { type: STRING, allowNull: false },
    usage: { type: STRING, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'context' ],
      },
    ],
    getterMethods: {
      createdAtFormat() { return app.createAnonymousContext().helper.formatDate(this.createdAt); },
      updatedAtFormat() { return app.createAnonymousContext().helper.formatDate(this.updatedAt); },
    },
  });

  return Email;
};
