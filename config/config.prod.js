'use strict';

module.exports = () => {
  const config = exports = {};

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    port: 3306,
    hostname: '123123123141231.mysql.rds.aliyuncs.com',
    database: 'egg_RESTfulAPI_mysql',
    user: 'dbUserName',
    password: '123456789',
    define: {
      underscored: false,
    },
  };
  return config;
};
