'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [ 'errorHandler' ];

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // }

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8000' ],
  };

  // 国际化
  config.i18n = {
    queryField: 'lan',
    cookieField: 'lan',
    // Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  };


  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    // https://node.console.aliyun.com/
    appid: process.env.EGG_ALINODE_APPID,
    secret: process.env.EGG_ALINODE_SECRET,
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  config.default_page = 1;
  config.default_limit = 20;

  config.password_hash_key = 'test_secret';

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
  };
  return config;
};
