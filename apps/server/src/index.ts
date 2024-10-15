import initApp from './app';
import serverConfig from './config';
import initMongoDB from './database/mongoDB';
import logger from './utils/logger';

const { env } = process;
logger.info('[env]', env.NODE_ENV);
logger.info('[port]', env.PUBLIC_SERVER_PORT);

(async () => {
  await initMongoDB();
  initApp().listen(serverConfig.port, async () => {
    logger.info(`>>> server listen on http://localhost:${serverConfig.port}`);
  });

  return null;
})();
