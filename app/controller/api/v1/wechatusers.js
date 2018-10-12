'use strict';

const BaseController = require('../../../core/base_controller');

class WechatuserController extends BaseController {

  constructor(ctx) {
    super({
      ctx,
      serviceName: 'wechatuser',
      CreateTransfer: {
        unionid: { type: 'string', required: true, allowEmpty: false },
      },
    });
  }
}

module.exports = WechatuserController;
