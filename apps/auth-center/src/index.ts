import { logger } from '@yx-chat/shared/logger';
import { initMongoDB, UserModel } from '@yx-chat/database';

import config from './config';
import initApp from './app';
import { createNewUser } from './biz-utils/create-new-user';

const { env } = process;
logger.info('[env]', env.NODE_ENV);
logger.info('[port]', env.PUBLIC_AUTH_CENTER_PORT);

(async () => {
  await initMongoDB();
  // init admin user
  if (config.adminUser && config.adminPassword) {
    try {
      const user = await UserModel.findOne({ username: config.adminUser });
      logger.info('[adminUser]', user?.username);
      if (!user) {
        await createNewUser({
          username: config.adminUser,
          password: config.adminPassword,
          isAdmin: true,
        });
        logger.info('[createNewUser] admin user created');
      }
    } catch (err) {
      logger.error('[createNewUser]', (err as Error).message);
      process.exit(1);
    }
  }
  initApp().listen(config.port, async () => {
    logger.info(`>>> server listen on http://localhost:${config.port}`);
  });

  return null;
})();
