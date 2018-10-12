'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Log = app.model.define('log', {
    creatorId: { type: INTEGER, allowNull: false },
    creatorName: { type: STRING, allowNull: false },
    remark: { type: STRING, allowNull: false }, // 记录备注该用户的一些注意事项
    userId: { type: INTEGER, allowNull: false },
  });

  return Log;
};
