'use strict';

const BaseService = require('../core/base_service');

class PhoneService extends BaseService {

  constructor(ctx) {
    super({
      ctx,
      model: 'Phone',
      updateKeyArr: [ 'context', 'usage', 'userId' ],
    });
  }
  async create(payload) {
    const { ctx } = this;
    let canSave = true;
    if (payload.context) {
      if (!await this.canUseContext({ context: payload.context })) {
        canSave = false;
        ctx.throw(422, ctx.__('This Phone {0} already exists', [ payload.context ]));
      }
    } else {
      canSave = false;
      ctx.throw(422, ctx.__('context cannot be null'));
    }
    if (canSave) {
      return ctx.model[this.model].create(payload);
    }
  }
  async update(id, payload) {
    const { ctx } = this;
    const entry = await this.ctx.model[this.model].findById(id);
    let canSave = true;
    if (!entry) {
      canSave = false;
      ctx.throw(404, ctx.__('Data not found'));
    }

    // 修改电话时，检查是否有重复号码
    if (payload.context) {
      if (!await this.canUseContext({ context: payload.context, neId: id })) {
        canSave = false;
        ctx.throw(422, ctx.__('This Phone {0} already exists', [ payload.context ]));
      }
    }
    if (canSave) {
      const willUpdate = ctx.helper.getKeyObj({ obj: payload, keyArr: this.updateKeyArr });

      await entry.update(willUpdate);
      return entry;
    }
  }
  async canUseContext({ context, neId }) {
    const whereObj = {
      context,
    };
    if (neId) {
      whereObj.id = { $ne: neId };
    }
    const haveList = await this.ctx.model[this.model].findAll({
      where: whereObj,
      limit: 1,
    });
    return !(haveList && haveList.length > 0);
  }
}

module.exports = PhoneService;
