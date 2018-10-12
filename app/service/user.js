'use strict';

const BaseService = require('../core/base_service');

class UserService extends BaseService {

  constructor(ctx) {
    super({
      ctx,
      model: 'User',
      updateKeyArr: [ 'mobiePhone', 'email', 'nickname', 'lastAt', 'isLock', 'lastLanguage', 'headimgurl', 'genderType' ],
    });
  }
  async create(payload) {
    const { ctx } = this;
    let canSave = true;
    if (payload.mobiePhone) {
      if (!await this.canUseMobiePhone({ mobiePhone: payload.mobiePhone })) {
        canSave = false;
        ctx.throw(422, ctx.__('This phone number {0} already exists', [ payload.mobiePhone ]));
      }
    } else {
      canSave = false;
      ctx.throw(422, ctx.__('mobiePhone cannot be null'));
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
    if (payload.mobiePhone) {
      if (!await this.canUseMobiePhone({ mobiePhone: payload.mobiePhone, neId: id })) {
        canSave = false;
        ctx.throw(422, ctx.__('This phone number {0} already exists', [ payload.mobiePhone ]));
      }
    }
    if (canSave) {
      const willUpdate = ctx.helper.getKeyObj({ obj: payload, keyArr: this.updateKeyArr });

      await entry.update(willUpdate);
      return entry;
    }
  }
  async canUseMobiePhone({ mobiePhone, neId }) {
    const whereObj = {
      mobiePhone,
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

module.exports = UserService;
