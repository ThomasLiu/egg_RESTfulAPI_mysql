'use strict';

const BaseController = require('../../../core/base_controller');

class LogController extends BaseController {

  constructor(ctx) {
    super({
      ctx,
      serviceName: 'log',
      CreateTransfer: {
        remark: { type: 'string', required: true, allowEmpty: false },
        creatorId: { type: 'int', required: true, allowEmpty: false },
        creatorName: { type: 'string', required: true, allowEmpty: false },
        userId: { type: 'int', required: true, allowEmpty: false },
      },
    });
  }
}

module.exports = LogController;
