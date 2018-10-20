'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.resources('users', '/api/v1/users', controller.api.v1.users);
  router.resources('logs', '/api/v1/logs', controller.api.v1.logs);
  router.resources('wechatusers', '/api/v1/wechatusers', controller.api.v1.wechatusers);
  router.resources('userRoles', '/api/v1/userroles', controller.api.v1.userRoles);
  router.resources('emails', '/api/v1/emails', controller.api.v1.emails);
  router.resources('phones', '/api/v1/phones', controller.api.v1.phones);

  const routerArray = [
    'users',
    'logs',
    'wechatusers',
    'userRoles',
    'emails',
    'phones',
  ];

  routerArray.forEach(item => {
    router.resources(item, `/api/v1/${item}`, controller.api.v1[item]);
  });
};
