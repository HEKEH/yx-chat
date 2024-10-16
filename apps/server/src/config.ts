import logger from './utils/logger';

const { env } = process;

let authCenterUrl = env.AUTH_CENTER_HOSTNAME;
if (authCenterUrl && env.AUTH_CENTER_PORT) {
  authCenterUrl = `${authCenterUrl}:${env.AUTH_CENTER_PORT}`;
}
if (!authCenterUrl) {
  logger.error('AUTH_CENTER_HOSTNAME is required');
  process.exit(1);
}

const config = {
  /** service port */
  port: env.PUBLIC_SERVER_PORT ? parseInt(env.PUBLIC_SERVER_PORT, 10) : 6870,
  allowOrigin: env.ALLOW_ORIGIN,
  /** mongodb url */
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost:27017/yx-chat',
  adminUser: env.ADMIN_USER,
  adminPassword: env.ADMIN_PASSWORD,
  authCenterUrl,
  defaultLanguage: env.DEFAULT_LANGUAGE,
};

// console.log('config', config);

export default config;
