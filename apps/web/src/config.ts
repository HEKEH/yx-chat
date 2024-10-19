import { LANGUAGE } from '@yx-chat/shared/constants';

// @ts-expect-error ignore type error
const env = import.meta.env; // import.meta来自vite，process.env无法取到值
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

export default {
  server: serverUrl,
  defaultLanguage: env.PUBLIC_DEFAULT_LANGUAGE || LANGUAGE.ZH_CN,
  fileCenterUrl,
};
