import { AssertionError } from 'assert';
import http from 'http';
import { RESPONSE_CODE } from '@yx-chat/shared/types';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import config from './config';
import router from './routes';
import { BusinessError } from './biz-utils/business-error';
import logger from './utils/logger';

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

export const responseWrapMiddleware = async (
  ctx: Koa.Context,
  next: Koa.Next,
) => {
  try {
    await next();
    if (ctx.status === 200) {
      const body = ctx.body;
      ctx.body = {
        status: RESPONSE_CODE.SUCCESS,
        data: body,
      };
    }
  } catch (error) {
    if (error instanceof AssertionError || error instanceof BusinessError) {
      ctx.status = 200;
      ctx.body = {
        status: RESPONSE_CODE.BIZ_ERROR,
        message: error.message,
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      status: RESPONSE_CODE.SERVER_ERROR,
      message: 'An unexpected error occurred',
    };
    // Log the actual error for debugging purposes
    logger.error('Unhandled error:', error);
  }
};

export default function initApp() {
  const app = new Koa();
  app.use(bodyParser()); // app.proxy = true;

  app.use(corsMiddleware());

  app.use(responseWrapMiddleware);
  // use router
  app.use(router.routes());
  app.use(router.allowedMethods());

  const httpServer = http.createServer(app.callback());

  return httpServer;
}
