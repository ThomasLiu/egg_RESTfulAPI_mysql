'use strict';
class AppBootHook {
  constructor(app) {
    console.log('\x1B[31m%s\x1b[0m:', `constructor... app: ${JSON.stringify(app)}`);
    app.beforeStart(() => {
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor beforeStart app.config.env: ${app.config.env}, process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    });
    app.ready((...a) => {
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor ready...  a: ${JSON.stringify(a)}`);
    });

    app.beforeClose((...a) => {
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor beforeClose...  a: ${JSON.stringify(a)}`);
    });

    app.once('server', server => {
      // websocket
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor once('server')...  server: ${JSON.stringify(server)}`);
    });
    app.on('error', (err, ctx) => {
      // report error
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor on('error')...  ctx: ${JSON.stringify(ctx)} , err: ${JSON.stringify(err)}`);
    });
    app.on('request', ctx => {
      // log receive request
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor on('request')...  ctx: ${JSON.stringify(ctx)}`);
    });
    app.on('response', ctx => {
      // ctx.starttime is set by framework
      const used = Date.now() - ctx.starttime;
      app.logger.info('\x1B[31m%s\x1b[0m:', `constructor on('response')...  ctx: ${JSON.stringify(ctx)}, used: ${used}`);
      // log total cost
    });

  }

  async beforeStart(...a) {
    console.log('\x1B[31m%s\x1b[0m:', `beforeStart...  a: ${JSON.stringify(a)}`);
  }

  async ready(...a) {
    console.log('\x1B[31m%s\x1b[0m:', `ready...  a: ${JSON.stringify(a)}`);
  }

  configDidLoad(...a) {
    // Config,plugin files have did load.
    console.log('\x1B[31m%s\x1b[0m:', `configDidLoad...  a: ${JSON.stringify(a)}`);
  }

  async didLoad(...a) {
    // All files have did load, start plugin here.
    console.log('\x1B[31m%s\x1b[0m:', `didLoad...  a: ${JSON.stringify(a)}`);
  }

  async willReady(...a) {
    // All plugins have started, can do some thing before app ready
    console.log('\x1B[31m%s\x1b[0m:', `willReady...  a: ${JSON.stringify(a)}`);
  }

  async didReady(...a) {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    console.log('\x1B[31m%s\x1b[0m:', `didReady...  a: ${JSON.stringify(a)}`);
  }

  async serverDidReady(...a) {
    // Server is listening.
    console.log('\x1B[31m%s\x1b[0m:', `serverDidReady...  a: ${JSON.stringify(a)}`);
  }

  async beforeClose(...a) {
    // Do some thing before app close.
    console.log('\x1B[31m%s\x1b[0m:', `beforeClose...  a: ${JSON.stringify(a)}`);
  }
}

module.exports = AppBootHook;
