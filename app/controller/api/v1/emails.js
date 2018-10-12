'use strict';

const BaseController = require('../../../core/base_controller');

class EmailController extends BaseController {

  constructor(ctx) {
    super({
      ctx,
      serviceName: 'email',
      CreateTransfer: {
        context: { type: 'string', required: true, allowEmpty: false },
        usage: { type: 'string', required: true, allowEmpty: false },
        userId: { type: 'int', required: true, allowEmpty: false },
      },
    });
  }
}

module.exports = EmailController;
