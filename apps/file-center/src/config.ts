import { LANGUAGE } from '@yx-chat/shared/constants';
import { logger } from '@yx-chat/shared/logger';

const { env } = process;

const uploadDir = env.FILE_UPLOAD_DIR;
if (!uploadDir) {
  logger.error('FILE_UPLOAD_DIR is not set');
  process.exit(1);
}

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

export default {
  /** service port */
  port: env.FILE_CENTER_PORT ? parseInt(env.FILE_CENTER_PORT, 10) : 7090,
  allowOrigin: env.ALLOW_ORIGIN || '*',
  defaultLanguage,
  uploadDir,
  authCenterUrl,
  fileCompression: env.FILE_COMPRESSION === 'true',
  /** size is in MB */
  uploadFileSizeLimit: env.PUBLIC_UPLOAD_FILE_SIZE_LIMIT
    ? parseInt(env.PUBLIC_UPLOAD_FILE_SIZE_LIMIT, 10)
    : undefined,
};
