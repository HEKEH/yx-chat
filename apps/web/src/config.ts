import { LANGUAGE } from '@yx-chat/shared/constants';

// @ts-expect-error ignore type error
const env = import.meta.env; // import.meta is from vite，process.env can't get value
let serverUrl = env.PUBLIC_SERVER_HOSTNAME;
if (serverUrl && env.PUBLIC_SERVER_PORT) {
  serverUrl = `${serverUrl}:${env.PUBLIC_SERVER_PORT}`;
}
if (!serverUrl) {
  throw new Error('PUBLIC_SERVER_HOSTNAME is not set');
}

let fileCenterUrl = env.PUBLIC_FILE_CENTER_HOSTNAME;
if (fileCenterUrl && env.PUBLIC_FILE_CENTER_PORT) {
  fileCenterUrl = `${fileCenterUrl}:${env.PUBLIC_FILE_CENTER_PORT}`;
}
if (!fileCenterUrl) {
  throw new Error('PUBLIC_FILE_CENTER_HOSTNAME is not set');
}

const defaultLanguage: LANGUAGE | undefined = env.PUBLIC_DEFAULT_LANGUAGE;
if (!defaultLanguage) {
  throw new Error('PUBLIC_DEFAULT_LANGUAGE is not set');
}

export default {
  serverUrl,
  defaultLanguage,
  fileCenterUrl,
};
