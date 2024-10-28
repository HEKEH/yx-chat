import { LANGUAGE } from '@yx-chat/shared/constants';
import { logger } from '@yx-chat/shared/logger';

const { env } = process;

const authCenterUrl = env.PUBLIC_AUTH_CENTER_URL;
if (!authCenterUrl) {
  logger.error('PUBLIC_AUTH_CENTER_URL is required');
  process.exit(1);
}

const defaultLanguage = env.PUBLIC_DEFAULT_LANGUAGE as LANGUAGE | undefined;

if (!defaultLanguage) {
  logger.error('PUBLIC_DEFAULT_LANGUAGE is not set');
  process.exit(1);
}

const config = {
  /** service port */
  port: env.SERVER_PORT ? parseInt(env.SERVER_PORT, 10) : 6870,
  allowOrigin: env.ALLOW_ORIGIN,
  /** mongodb url */
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost:27017/yx-chat',
  adminUser: env.ADMIN_USER,
  adminPassword: env.ADMIN_PASSWORD,
  authCenterUrl,
  defaultLanguage,
};

// console.log('config', config);

export default config;
