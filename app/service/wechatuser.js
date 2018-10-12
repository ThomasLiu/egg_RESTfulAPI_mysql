'use strict';

const BaseService = require('../core/base_service');

class WechatuserService extends BaseService {

  constructor(ctx) {
    super({
      ctx,
      model: 'Wechatuser',
      updateKeyArr: [ 'nickname', 'sex', 'openid', 'province', 'city', 'country', 'headimgurl', 'privilege', 'unionid', 'userId' ],
    });
  }

  async create(payload) {
    const { ctx } = this;
    let canSave = true;
    if (payload.unionid) {
      if (!await this.canUseUnionid({ unionid: payload.unionid })) {
        canSave = false;
        ctx.throw(422, ctx.__('This unionid already exists'));
      }
    } else {
      canSave = false;
      ctx.throw(422, ctx.__('unionid cannot be null'));
    }
    if (canSave) {
      return ctx.model[this.model].create(payload);
    }
  }
  async update(id, payload) {
    const { ctx } = this;
    const user = await this.ctx.model[this.model].findById(id);
    let canSave = true;
    if (!user) {
      canSave = false;
      ctx.throw(404, ctx.__('Data not found'));
    }

    // 修改电话时，检查是否有重复号码
    if (payload.unionid) {
      if (!await this.canUseUnionid({ unionid: payload.unionid, neId: id })) {
        canSave = false;
        ctx.throw(422, ctx.__('This unionid already exists'));
      }
    }
    if (canSave) {
      const willUpdate = ctx.helper.getKeyObj({ obj: payload, keyArr: this.updateKeyArr });

      await user.update(willUpdate);
      return user;
    }
  }

  async canUseUnionid({ unionid, neId }) {
    const whereObj = {
      unionid,
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

module.exports = WechatuserService;
