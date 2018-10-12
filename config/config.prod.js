'use strict';

module.exports = () => {
  const config = exports = {};

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    port: 3306,
    hostname: '123123123.mysql.rds.aliyuncs.com',
    database: 'egg_RESTfulAPI_mysql',
    user: 'testuser',
    password: '12345678',

    define: {
      underscored: false,
    },
  };
  return config;
};
