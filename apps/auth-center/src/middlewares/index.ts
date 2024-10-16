import { AssertionError } from 'assert';
import { RESPONSE_CODE } from '@yx-chat/shared/types';
import { Context, Next } from 'koa';
import { BusinessError } from '~/biz-utils/business-error';
import logger from '~/utils/logger';

export const addContextPropsMiddleware = async (ctx: Context, next: Next) => {
  ctx.getRequestData = function <T>() {
    return (
      this.method === 'GET' ? this.request.query : this.request.body
    ) as T;
  };
  await next();
};

export const responseWrapMiddleware = async (ctx: Context, next: Next) => {
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
