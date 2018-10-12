'use strict';

const BaseController = require('../../../core/base_controller');

class UserRoleController extends BaseController {

  constructor(ctx) {
    super({
      ctx,
      serviceName: 'userRole',
      CreateTransfer: {
        roleId: { type: 'int', required: true, allowEmpty: false },
        userId: { type: 'int', required: true, allowEmpty: false },
      },
      UpdateTransfer: {
        roleId: { type: 'int', required: true, allowEmpty: false },
        userId: { type: 'int', required: true, allowEmpty: false },
      },
    });
  }
}

module.exports = UserRoleController;
