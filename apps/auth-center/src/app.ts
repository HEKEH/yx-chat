import http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import config from './config';
import {
  addContextPropsMiddleware,
  responseWrapMiddleware,
} from './middlewares';
import router from './routes';

function corsMiddleware() {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.set('Access-Control-Allow-Origin', config.allowOrigin || '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Accept',
    );
    ctx.set('Access-Control-Max-Age', '300');

    // handle OPTIONS request
    if (ctx.method === 'OPTIONS') {
      ctx.status = 204;
    } else {
      await next();
    }
  };
}

export default function initApp() {
  const app = new Koa();
  app.use(bodyParser()); // app.proxy = true;

  app.use(corsMiddleware());

  app.use(addContextPropsMiddleware);
  app.use(responseWrapMiddleware);
  // use router
  app.use(router.routes());
  app.use(router.allowedMethods());

  const httpServer = http.createServer(app.callback());

  return httpServer;
}
