'use strict';

module.exports = () => {
  const config = exports = {};

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    port: 3306,
    hostname: '127.0.0.1',
    database: 'egg_RESTfulAPI_mysql_development',
    password: '123456789',
    define: {
      underscored: false,
    },
  };
  return config;
};
