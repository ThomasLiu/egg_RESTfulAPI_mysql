'use strict';

const { app, mock } = require('egg-mock/bootstrap');

describe('test/app/middleware/error_handler.test.js', () => {
  before(() => {
    app.get('/test_fail', async ctx => {
      ctx.throw(new Error('this is a test error'));
    });
  });

  it('should GET /test_fail is a test error', () => {
    return app.httpRequest()
      .get('/test_fail')
      .expect(/Error: this is a test error/)
      .expect(500);
  });

  it('should GET /test_fail is Internal Server Error', () => {
    mock(app.config, 'env', 'prod');
    return app.httpRequest()
      .get('/test_fail')
      .expect(/Internal Server Error/)
      .expect(500);
  });
});
