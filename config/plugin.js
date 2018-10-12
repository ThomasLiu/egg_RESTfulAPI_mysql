'use strict';
// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

// 跨域控制 https://github.com/eggjs/egg-cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
