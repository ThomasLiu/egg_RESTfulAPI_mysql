'use strict';

// const bcrypt = require('bcryptjs');
const moment = require('moment');

// 格式化时间
exports.formatDate = (time, format) => moment(time).format(format || 'YYYY-MM-DD hh:mm');

exports.toInt = str => {
  if (!str) return str;
  return parseInt(str, 10);
};

exports.getKeyObj = ({ obj, keyArr }) => {
  if (!obj) return obj;
  if (!keyArr) return obj;
  if (keyArr.length === 0) return obj;

  const returnObj = {};

  keyArr.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      returnObj[key] = obj[key];
    }
  });

  return returnObj;
};

// 处理成功响应
exports.success = ({ ctx, res = null, msg, status = 200 }) => {
  msg = msg || ctx.__('Request success');

  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = status;
};

// exports.bhash = str => {
//   return bcrypt.hashSync(str, 10);
// };

// exports.bcompare = (str, hash) => {
//   return bcrypt.compareSync(str, hash);
// };
