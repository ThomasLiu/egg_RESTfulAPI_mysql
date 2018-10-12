'use strict';

const BaseController = require('../../../core/base_controller');

class UserController extends BaseController {

  constructor(ctx) {
    super({
      ctx,
      serviceName: 'user',
      CreateTransfer: {
        mobiePhone: { type: 'string', required: true, allowEmpty: false },
      },
    });
  }
}

module.exports = UserController;
