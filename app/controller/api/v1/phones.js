'use strict';

const BaseController = require('../../../core/base_controller');

class PhoneController extends BaseController {

  constructor(ctx) {
    super({
      ctx,
      serviceName: 'phone',
      CreateTransfer: {
        context: { type: 'string', required: true, allowEmpty: false },
        usage: { type: 'string', required: true, allowEmpty: false },
        userId: { type: 'int', required: true, allowEmpty: false },
      },
    });
  }
}

module.exports = PhoneController;
