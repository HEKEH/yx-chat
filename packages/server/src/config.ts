import type { TAlgorithm } from 'jwt-simple';

const { env } = process;

export default {
  /** service port */
  port: env.PUBLIC_SERVER_PORT ? parseInt(env.PUBLIC_SERVER_PORT, 10) : 6870,
  allowOrigin: env.ALLOW_ORIGIN,
  /** mongodb url */
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost:27017/fiora',
  /** jwt salt */
  jwtSecret: env.JWT_SECRET || 'yx-chat-jwt-0',
  jwtAlgorithm: (env.JWT_ALGORITHM || 'HS256') as TAlgorithm,
  // token expires time, ms
  jwtTokenExpiresTime: env.JWT_TOKEN_EXPIRES_TIME
    ? parseInt(env.JWT_TOKEN_EXPIRES_TIME, 10)
    : 1000 * 60 * 60 * 24 * 30, // 30 days
  administrators: env.ADMINISTRATORS ? env.ADMINISTRATORS.split(',') : [],
};
