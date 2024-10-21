import type Koa from 'koa';
import {
  LANGUAGE_HEADER_KEY,
  LOG_ID_HEADER_KEY,
  TOKEN_HEADER_KEY,
} from '../constants';

export function corsMiddleware(allowOrigin: string) {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.set('Access-Control-Allow-Origin', allowOrigin);
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Accept',
    );
    ctx.set('Access-Control-Max-Age', '1000');
    ctx.set(
      'Access-Control-Allow-Headers',
      `Content-Type, Authorization, Accept, ${TOKEN_HEADER_KEY}, ${LOG_ID_HEADER_KEY}, ${LANGUAGE_HEADER_KEY}`,
    );

    // handle OPTIONS request
    if (ctx.method === 'OPTIONS') {
      ctx.status = 204;
      return;
    }
    await next();
  };
}
