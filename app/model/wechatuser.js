'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Wechatuser = app.model.define('wechatuser', {
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
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'unionid' ],
      },
    ],
    getterMethods: {
      createdAtFormat() { return app.createAnonymousContext().helper.formatDate(this.createdAt); },
      updatedAtFormat() { return app.createAnonymousContext().helper.formatDate(this.updatedAt); },
    },
  });

  return Wechatuser;
};
