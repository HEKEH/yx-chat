const { env } = process;

export default {
  // service port
  port: env.PUBLIC_SERVER_PORT ? parseInt(env.PUBLIC_SERVER_PORT, 10) : 6870,
};
