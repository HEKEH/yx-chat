import logger from './utils/logger';
import app from './app';
import serverConfig from './config';
import initMongoDB from './database/mongoDB';

const { env } = process;
logger.trace('node env:', env.NODE_ENV);
logger.trace('env port:', env.PUBLIC_SERVER_PORT);

(async () => {
  await initMongoDB();
  app.listen(serverConfig.port, async () => {
    logger.info(`>>> server listen on http://localhost:${serverConfig.port}`);
  });

  return null;
})();
