'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN, NOW } = app.Sequelize;

  const User = app.model.define('user', {
    mobiePhone: { type: STRING, allowNull: false },
    email: { type: STRING },
    nickname: { type: STRING, allowNull: false, defaultValue: 'New comer' },
    lastAt: { type: DATE, allowNull: false, defaultValue: NOW },
    isLock: { type: BOOLEAN, allowNull: false, defaultValue: false },

    lastLanguage: { type: STRING, allowNull: false, defaultValue: 'en' },
    headimgurl: { type: STRING }, // 系统上显示的头像
    genderType: { type: INTEGER, allowNull: false, defaultValue: 0 }, // 性别 0 是男，1 是女
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'mobiePhone' ],
      },
    ],
    getterMethods: {
      createdAtFormat() { return app.createAnonymousContext().helper.formatDate(this.createdAt); },
      updatedAtFormat() { return app.createAnonymousContext().helper.formatDate(this.updatedAt); },
      lastAtFormat() { return app.createAnonymousContext().helper.formatDate(this.lastAt); },
    },
  });

  return User;
};
