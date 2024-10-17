const { env } = process;

export default {
  /** service port */
  port: env.PUBLIC_FILE_CENTER_PORT
    ? parseInt(env.PUBLIC_FILE_CENTER_PORT, 10)
    : 7090,
  allowOrigin: env.ALLOW_ORIGIN,
  defaultLanguage: env.PUBLIC_DEFAULT_LANGUAGE,
};
