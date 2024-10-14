import config from './config';
import logger from './utils/logger';
import initApp from './app';
import serverConfig from './config';
import initMongoDB from './database/mongoDB';
import UserModel from './database/mongoDB/model/user';
import { createNewUser } from './biz-utils/create-new-user';

const { env } = process;
logger.info('node env:', env.NODE_ENV);
logger.info('env port:', env.AUTH_CENTER_PORT);

(async () => {
  await initMongoDB();
  // init admin user
  if (config.adminUser && config.adminPassword) {
    try {
      const user = await UserModel.findOne({ username: config.adminUser });
      logger.info('adminUser', user?.username);
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
  initApp().listen(serverConfig.port, async () => {
    logger.info(`>>> server listen on http://localhost:${serverConfig.port}`);
  });

  return null;
})();
