import { logger } from '@yx-chat/shared/logger';
import { initMongoDB, SocketModel } from '@yx-chat/database';
import initApp from './app';
import config from './config';

const { env } = process;
logger.info('[env]', env.NODE_ENV);
logger.info('[port]', env.PUBLIC_SERVER_PORT);

(async () => {
  await initMongoDB();
  await SocketModel.deleteMany({}); // delete all socket history data

  initApp().listen(config.port, async () => {
    logger.info(`>>> server listen on http://localhost:${config.port}`);
  });

  return null;
})();
