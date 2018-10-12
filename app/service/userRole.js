'use strict';

const BaseService = require('../core/base_service');

class UserRoleService extends BaseService {

  constructor(ctx) {
    super({
      ctx,
      model: 'UserRole',
      updateKeyArr: [ 'roleId', 'userId' ],
    });
  }

  async create(payload) {
    const { ctx } = this;
    let canSave = true;
    if (payload.roleId && payload.userId) {
      if (!await this.canUseRoleId(payload)) {
        canSave = false;
        ctx.throw(422, ctx.__('This role already exists'));
      }
    } else {
      canSave = false;
      ctx.throw(422, ctx.__('roleId and userId cannot be null'));
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
    if (payload.roleId && payload.userId) {
      if (!await this.canUseRoleId(payload)) {
        canSave = false;
        ctx.throw(422, ctx.__('This role already exists'));
      }
    } else {
      canSave = false;
      ctx.throw(422, ctx.__('roleId and userId cannot be null'));
    }
    if (canSave) {
      const willUpdate = ctx.helper.getKeyObj({ obj: payload, keyArr: this.updateKeyArr });

      await user.update(willUpdate);
      return user;
    }
  }

  async canUseRoleId({ roleId, userId }) {
    const whereObj = { roleId, userId };
    const haveList = await this.ctx.model[this.model].findAll({
      where: whereObj,
      limit: 1,
    });
    return !(haveList && haveList.length > 0);
  }
}

module.exports = UserRoleService;
