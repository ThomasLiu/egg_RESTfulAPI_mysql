'use strict';

module.exports = () => {
  const config = exports = {};

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    port: 3306,
    // host: '127.0.0.1', 如果也是用127.0.0.1就不用改
    database: 'egg_RESTfulAPI_mysql_development',
    // username: 'dbUserName', 如果也是用root就不用改
    password: '123456789',
    define: {
      underscored: false,
    },
  };
  return config;
};
