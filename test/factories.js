'use strict';

const { factory } = require('factory-girl');

const _getMoble = () => {
  const prefixArray = [ '130', '131', '132', '133', '135', '137', '138', '170', '187', '189' ];
  const i = parseInt(10 * Math.random());
  let prefix = prefixArray[i];
  for (let j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);
  }
  return `86_${prefix}`;
};

module.exports = app => {
  app.factory = factory;
  // define your own test data structures
  factory.define('user', app.model.User, {
    mobiePhone: factory.sequence('User.mobiePhone', _getMoble),
    nickname: factory.sequence('User.nickname', n => `name_${n}`),
  });

  factory.define('log', app.model.Log, {
    remark: factory.sequence('Log.remark', n => `remark_${n}`),
    creatorName: factory.sequence('Log.creatorName', n => `creatorName_${n}`),
    userId: factory.sequence('Log.userId', n => n),
    creatorId: factory.sequence('Log.creatorId', n => n),
  });

  factory.define('wechatuser', app.model.Wechatuser, {
    nickname: factory.sequence('Wechatuser.nickname', n => `nickname_${n}`),
    sex: factory.sequence('Wechatuser.sex', n => `sex${n}`),
    openid: factory.sequence('Wechatuser.openid', n => `openid${n}`),
    province: factory.sequence('Wechatuser.province', n => `province${n}`),
    city: factory.sequence('Wechatuser.city', n => `city${n}`),
    country: factory.sequence('Wechatuser.country', n => `country${n}`),
    headimgurl: factory.sequence('Wechatuser.headimgurl', n => `headimgurl${n}`),
    privilege: factory.sequence('Wechatuser.privilege', n => `privilege${n}`),
    unionid: factory.sequence('Wechatuser.unionid', n => `unionid${n}`),
    userId: factory.sequence('Wechatuser.userId', n => n),
  });

  factory.define('userRole', app.model.UserRole, {
    userId: factory.sequence('UserRole.userId', n => n),
    roleId: factory.sequence('UserRole.roleId', n => n),
  });

  factory.define('email', app.model.Email, {
    context: factory.sequence('Email.context', n => `${n}test@test.com`),
    usage: factory.sequence('Email.usage', n => `name_${n}`),
    userId: factory.sequence('Email.userId', n => n),
  });

  factory.define('phone', app.model.Phone, {
    context: factory.sequence('Phone.context', _getMoble),
    usage: factory.sequence('Phone.usage', n => `name_${n}`),
    userId: factory.sequence('Phone.userId', n => n),
  });
};

