import type { TAlgorithm } from 'jwt-simple';

const { env } = process;

export default {
  /** service port */
  port: env.AUTH_CENTER_PORT ? parseInt(env.AUTH_CENTER_PORT, 10) : 7089,
  allowOrigin: env.ALLOW_ORIGIN,
  /** mongodb url */
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost:27017/yx-chat',
  /** jwt salt */
  jwtSecret: env.JWT_SECRET || 'yx-chat-jwt-0',
  jwtAlgorithm: (env.JWT_ALGORITHM || 'HS256') as TAlgorithm,
  // token expires time, ms
  jwtTokenExpiresTime: env.JWT_TOKEN_EXPIRES_TIME
    ? parseInt(env.JWT_TOKEN_EXPIRES_TIME, 10)
    : 1000 * 60 * 60 * 24 * 30, // 30 days
  adminUser: env.ADMIN_USER,
  adminPassword: env.ADMIN_PASSWORD,
  defaultLanguage: env.DEFAULT_LANGUAGE,
};
