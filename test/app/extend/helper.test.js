'use strict';
const { assert, app } = require('egg-mock/bootstrap');

describe('formatDate( time, format )', () => {
  it('should YYYY-MM-DD hh:mm', () => {
    const ctx = app.mockContext();

    assert(ctx.helper.formatDate(new Date('2018/10/01 8:03:11')) === '2018-10-01 08:03');
  });

  it('should YYYY-MM-DD', () => {
    const ctx = app.mockContext();

    assert(ctx.helper.formatDate(new Date('2018/10/01 8:03:11'), 'YYYY-MM-DD') === '2018-10-01');
  });

});

describe('toInt( str )', () => {
  it('should number', () => {
    const ctx = app.mockContext();

    assert(ctx.helper.toInt(100) === 100);
    assert(ctx.helper.toInt(100.1) === 100);
  });

  it('should null', () => {
    const ctx = app.mockContext();

    assert(ctx.helper.toInt(null) === null);
    assert(ctx.helper.toInt(undefined) === undefined);
    assert(ctx.helper.toInt('') === '');
  });

  it('should string to number', () => {
    const ctx = app.mockContext();
    assert(ctx.helper.toInt('100') === 100);
    assert(ctx.helper.toInt('100.1') === 100);
  });
});


describe('getKeyObj({ obj, keyArr })', () => {
  it('should null', () => {
    const ctx = app.mockContext();

    assert(ctx.helper.getKeyObj({ obj: null }) === null);
    assert(ctx.helper.getKeyObj({}) === undefined);
    assert(ctx.helper.getKeyObj({ obj: '' }) === '');
  });

  it('should obj', () => {
    const ctx = app.mockContext();
    const obj = {};
    assert(ctx.helper.getKeyObj({ obj }) === obj);
    assert(ctx.helper.getKeyObj({ obj, keyArr: [] }) === obj);
  });

  it('should have a, not b, c, d', () => {
    const ctx = app.mockContext();
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const keyArr = [ 'a', 'd' ];
    const newObj = ctx.helper.getKeyObj({ obj, keyArr });

    assert(newObj.a === obj.a);
    assert(newObj.b === undefined);
    assert(newObj.c === undefined);
    assert(newObj.d === undefined);
  });
});
