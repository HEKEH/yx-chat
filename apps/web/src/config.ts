import type { LANGUAGE } from '@yx-chat/shared/constants';

// @ts-expect-error ignore type error
const env = import.meta.env; // import.meta is from vite，process.env can't get value
const serverUrl = env.PUBLIC_SERVER_URL;
if (!serverUrl) {
  throw new Error('PUBLIC_SERVER_URL is not set');
}

const fileCenterUrl = env.PUBLIC_FILE_CENTER_URL;
if (!fileCenterUrl) {
  throw new Error('PUBLIC_FILE_CENTER_URL is not set');
}

const defaultLanguage: LANGUAGE | undefined = env.PUBLIC_DEFAULT_LANGUAGE;
if (!defaultLanguage) {
  throw new Error('PUBLIC_DEFAULT_LANGUAGE is not set');
}

const uploadFileSizeLimit = env.PUBLIC_UPLOAD_FILE_SIZE_LIMIT
  ? Number(env.PUBLIC_UPLOAD_FILE_SIZE_LIMIT)
  : undefined;
const maxMessageLength = env.PUBLIC_MAX_MESSAGE_LENGTH
  ? Number(env.PUBLIC_MAX_MESSAGE_LENGTH)
  : undefined;

export default {
  serverUrl,
  defaultLanguage,
  fileCenterUrl,
  uploadFileSizeLimit,
  maxMessageLength,
};
