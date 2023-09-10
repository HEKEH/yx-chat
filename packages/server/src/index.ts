import config from '@yx-chat/config/server';
import app from './app';

const { env } = process;
console.log(env.NODE_ENV, env.PUBLIC_SERVER_PORT, config.port);

(async () => {
  app.listen(config.port, async () => {
    // console.log(`>>> server listen on http://localhost:${config.port}`);
    // logger.info(`>>> server listen on http://localhost:${config.port}`);
  });

  return null;
})();
