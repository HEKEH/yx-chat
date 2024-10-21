import { AssertionError } from 'assert';
import {
  ACCEPT_LANGUAGES,
  LANGUAGE,
  LANGUAGE_HEADER_KEY,
  LOG_ID_HEADER_KEY,
  TOKEN_HEADER_KEY,
} from '@yx-chat/shared/constants';
import { logger } from '@yx-chat/shared/logger';
import { RESPONSE_CODE } from '@yx-chat/shared/types';
import { Context, Next } from 'koa';
import { v4 as uuid } from 'uuid';
import config from '~/config';
import i18n from '~/i18n';
import authToken from '~/requests/auth-token';
import { BusinessError } from '~/utils/error';

export const addContextPropsMiddleware = async (ctx: Context, next: Next) => {
  const logId = ctx.request.header[LOG_ID_HEADER_KEY] || uuid();
  Object.defineProperty(ctx, 'logId', {
    get: function () {
      return logId;
    },
  });
  ctx.getRequestData = function <T>() {
    return (
      this.method === 'GET' ? this.request.query : this.request.body
    ) as T;
  };
  Object.defineProperty(ctx, 'lng', {
    get: function () {
      // 首先检查 URL 参数
      if (this.params?.lng) {
        return this.params.lng;
      }
      const customLng = this.headers[LANGUAGE_HEADER_KEY];
      if (ACCEPT_LANGUAGES.includes(customLng)) {
        return customLng;
      }
      if (config.defaultLanguage) {
        return config.defaultLanguage;
      }
      const acceptLanguage = this.headers['accept-language'];
      if (acceptLanguage) {
        const preferredLang = acceptLanguage.split(',')[0].trim().toLowerCase();
        if (ACCEPT_LANGUAGES.includes(preferredLang)) {
          return preferredLang;
        }
      }
      return LANGUAGE.EN;
    },
  });
  ctx.t = function (key, options) {
    const lng = this.lng;
    return i18n.t(key, { lng, ...options });
  };
  await next();
};

export const requestWrapMiddleware = async (ctx: Context, next: Next) => {
  try {
    logger.info(`[logId: ${ctx.logId}] [Request]`, ctx.request);
    await next();
    logger.info(`[logId: ${ctx.logId}] [Response]`, ctx.body);
  } catch (error) {
    if (error instanceof AssertionError || error instanceof BusinessError) {
      ctx.status = 200;
      ctx.body = {
        status: RESPONSE_CODE.BIZ_ERROR,
        message: ctx.t(error.message),
      };
      logger.error(`[logId: ${ctx.logId}] [Business Error]`, error);
      return;
    }
    ctx.status = 500;
    ctx.body = {
      status: RESPONSE_CODE.SERVER_ERROR,
      message: ctx.t('An unexpected error occurred'),
    };
    // Log the actual error for debugging purposes
    logger.error(`[logId: ${ctx.logId}] [Internal Error]`, error);
  } finally {
    // add logId to response header
    ctx.set(LOG_ID_HEADER_KEY, ctx.logId);
  }
};

/** Token authentication */
export const tokenAuthMiddleware = async (ctx: Context, next: Next) => {
  const token =
    ctx.request.headers[TOKEN_HEADER_KEY] ||
    ctx.getRequestData<{ [TOKEN_HEADER_KEY]: string }>()[TOKEN_HEADER_KEY];
  const lng =
    ctx.request.headers[LANGUAGE_HEADER_KEY] ||
    ctx.getRequestData<{ [LANGUAGE_HEADER_KEY]: string }>()[
      LANGUAGE_HEADER_KEY
    ];
  logger.trace('tokenAuthMiddleware token', token);
  if (!token) {
    throw new BusinessError('Token is required');
  }
  const authTokenResponse = await authToken({
    [TOKEN_HEADER_KEY]: token as string,
    [LOG_ID_HEADER_KEY]: ctx.logId,
    [LANGUAGE_HEADER_KEY]: lng as LANGUAGE,
  });
  if (authTokenResponse.status === RESPONSE_CODE.SUCCESS) {
    await next();
  } else {
    ctx.body = authTokenResponse;
    return;
  }
};
