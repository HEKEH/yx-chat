import { LANGUAGE } from '@yx-chat/shared/constants';
import { logger } from '@yx-chat/shared/logger';

const { env } = process;

const uploadDir = env.FILE_UPLOAD_DIR;
if (!uploadDir) {
  logger.error('FILE_UPLOAD_DIR is not set');
  process.exit(1);
}

let authCenterUrl = env.AUTH_CENTER_HOSTNAME;
if (authCenterUrl && env.AUTH_CENTER_PORT) {
  authCenterUrl = `${authCenterUrl}:${env.AUTH_CENTER_PORT}`;
}
if (!authCenterUrl) {
  logger.error('AUTH_CENTER_HOSTNAME is required');
  process.exit(1);
}

const defaultLanguage = env.PUBLIC_DEFAULT_LANGUAGE as LANGUAGE | undefined;

if (!defaultLanguage) {
  logger.error('PUBLIC_DEFAULT_LANGUAGE is not set');
  process.exit(1);
}

export default {
  /** service port */
  port: env.PUBLIC_FILE_CENTER_PORT
    ? parseInt(env.PUBLIC_FILE_CENTER_PORT, 10)
    : 7090,
  allowOrigin: env.ALLOW_ORIGIN || '*',
  defaultLanguage,
  uploadDir,
  authCenterUrl,
};
