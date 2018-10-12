'use strict';

const BaseService = require('../core/base_service');

class LogService extends BaseService {

  constructor(ctx) {
    super({
      ctx,
      model: 'Log',
      updateKeyArr: [ 'remark' ],
    });
  }
}

module.exports = LogService;
